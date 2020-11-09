import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import * as assert from '../assert';
import { getResidentsColl } from '../firestore';
import { FirestoreResident } from '../types';
import {
  dateToPass,
  jsDateToTimestamp,
  phoneToMail,
  validateLoginMethod,
  validateResidentData,
} from '../util';

const updateResident = async (data: any, context: https.CallableContext) => {
  // assert.isAdmin(context);
  const { resident, loginMethod, shouldUpdatePassword } = data;
  if (
    typeof resident.residentID === 'undefined' ||
    typeof shouldUpdatePassword !== 'boolean' ||
    !(await validateResidentData(resident)) ||
    !validateLoginMethod(loginMethod)
  )
    throw new https.HttpsError(
      'invalid-argument',
      'No se pasaron los argumentos "resident", "loginMethod" y "shouldUpdatePassword" correctamente',
    );

  const oldResidentDoc = await getResidentsColl()
    .doc(resident.residentID)
    .get();
  if (!oldResidentDoc.exists)
    throw new https.HttpsError(
      'not-found',
      `No se encontró un residente con el id ${resident.residentID}`,
    );
  const oldResident = oldResidentDoc.data() as FirestoreResident;
  await assert.accountExists(resident.accountID);
  const newBirthDate = jsDateToTimestamp(resident.birthDate);

  let accountID = oldResident.accountID;
  const email = phoneToMail(loginMethod.telephone);
  const password = dateToPass(resident.birthDate);
  if (loginMethod.loginMethodIdx === 0) {
    await assert.emailIsAvailable(email);
    const updateTo = shouldUpdatePassword ? { email, password } : { email };
    await admin.auth().updateUser(accountID, updateTo);
  } else if (oldResident.accountID !== resident.accountID) {
    const otherResidentsWithSameAcc = await getResidentsColl()
      .where('accountID', '==', accountID)
      .get();
    if (otherResidentsWithSameAcc.docs.length === 1)
      await admin.auth().deleteUser(accountID);
    accountID = resident.accountID;
    if (shouldUpdatePassword)
      await admin.auth().updateUser(accountID, { password });
  } else if (
    !oldResident.birthDate.isEqual(newBirthDate) &&
    shouldUpdatePassword
  ) {
    await admin.auth().updateUser(accountID, { password });
  }
  await getResidentsColl().doc(resident.residentID).update({
    firstName: resident.firstName,
    lastName: resident.lastName,
    gender: resident.gender,
    isVisible: resident.isVisible,
    birthDate: newBirthDate,
    accountID,
  });
};

export default updateResident;
