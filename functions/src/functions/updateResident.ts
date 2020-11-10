import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import * as assert from '../assert';
import { getResidentsColl } from '../firestore';
import {
  FirestoreResident,
  ResidentFamLoginMethod,
  UpdateResidentData,
} from '../types';
import {
  accountHasMultipleResidents,
  dateToPass,
  jsDateToTimestamp,
  phoneToMail,
  validateLoginMethod,
  validateResidentData,
} from '../util';

const updateResident = async (data: any, context: https.CallableContext) => {
  // assert.isAdmin(context);
  const { resident: r, loginMethod: l, shouldUpdatePassword } = data;
  const loginMethod = l as ResidentFamLoginMethod;
  const resident = r as UpdateResidentData;
  const { residentID } = resident;
  if (
    typeof residentID === 'undefined' ||
    typeof shouldUpdatePassword !== 'boolean' ||
    !(await validateResidentData(resident)) ||
    !validateLoginMethod(loginMethod)
  )
    throw new https.HttpsError(
      'invalid-argument',
      'No se pasaron los argumentos "resident", "loginMethod" y "shouldUpdatePassword" correctamente',
    );

  const oldResidentDoc = await getResidentsColl().doc(residentID).get();
  if (!oldResidentDoc.exists)
    throw new https.HttpsError(
      'not-found',
      `No se encontró un residente con el id ${residentID}`,
    );
  const oldResident = oldResidentDoc.data() as FirestoreResident;
  const oldAccountID = oldResident.accountID;

  let accountID: string;
  const password = dateToPass(resident.birthDate);
  if (loginMethod.loginMethodIdx === 0) {
    const email = phoneToMail(loginMethod.telephone);
    await Promise.all([
      assert.accountExists(oldAccountID),
      assert.emailIsAvailable(email),
    ]);
    if (await accountHasMultipleResidents(oldAccountID)) {
      const user = await admin.auth().createUser({ email, password });
      accountID = user.uid;
    } else {
      const updateTo = shouldUpdatePassword ? { email, password } : { email };
      await admin.auth().updateUser(oldAccountID, updateTo);
      accountID = oldAccountID;
    }
  } else {
    accountID = loginMethod.accountID;
    await assert.accountExists(accountID);
    if (oldAccountID !== accountID) {
      await assert.accountExists(oldAccountID);
      if (!(await accountHasMultipleResidents(oldAccountID)))
        await admin.auth().deleteUser(oldAccountID);
    }
    if (shouldUpdatePassword)
      await admin.auth().updateUser(accountID, { password });
  }
  await getResidentsColl()
    .doc(residentID)
    .update({
      firstName: resident.firstName,
      lastName: resident.lastName,
      gender: resident.gender,
      isVisible: resident.isVisible,
      birthDate: jsDateToTimestamp(resident.birthDate),
      accountID,
    });
};

export default updateResident;
