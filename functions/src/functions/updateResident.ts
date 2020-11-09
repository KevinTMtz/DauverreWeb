import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import { residentsColl } from '../firestore';
import { FirestoreResident } from '../types';
import {
  // assertIsAdmin,
  dateToPass,
  jsDateToTimestamp,
  phoneToMail,
  validateLoginMethod,
  validateResidentData,
} from '../util';

const updateResident = async (data: any, context: https.CallableContext) => {
  // assertIsAdmin(context);
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

  const oldResidentDoc = await residentsColl.doc(resident.residentID).get();
  if (!oldResidentDoc.exists)
    throw new https.HttpsError(
      'not-found',
      `No se encontró un residente con el id ${resident.residentID}`,
    );
  const oldResident = oldResidentDoc.data() as FirestoreResident;
  await admin.auth().getUser(resident.accountID); // Throws error if acc doesn't exist
  const newBirthDate = jsDateToTimestamp(resident.birthDate);

  let accountID = oldResident.accountID;
  const email = phoneToMail(loginMethod.telephone);
  const password = dateToPass(resident.birthDate);
  if (loginMethod.loginMethodIdx === 0) {
    const updateTo = shouldUpdatePassword ? { email, password } : { email };
    await admin.auth().updateUser(accountID, updateTo);
  } else if (oldResident.accountID !== resident.accountID) {
    const otherResidentsWithSameAcc = await residentsColl
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
  await residentsColl.doc(resident.residentID).update({
    firstName: resident.firstName,
    lastName: resident.lastName,
    gender: resident.gender,
    isVisible: resident.isVisible,
    birthDate: newBirthDate,
    accountID,
  });
};

export default updateResident;
