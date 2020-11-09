import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import * as assert from '../assert';
import { getResidentsColl } from '../firestore';
import {
  dateToPass,
  jsDateToTimestamp,
  phoneToMail,
  validateLoginMethod,
  validateResidentData,
} from '../util';

const createResident = async (data: any, context: https.CallableContext) => {
  // assert.isAdmin(context);
  const { resident, loginMethod, shouldUpdatePassword } = data;
  if (
    !(await validateResidentData(resident)) ||
    !validateLoginMethod(loginMethod)
  )
    throw new https.HttpsError(
      'invalid-argument',
      'No se pasaron los argumentos "resident" y "loginMethod"',
    );
  let accountID: string;
  const email = phoneToMail(loginMethod.telephone);
  const password = dateToPass(resident.birthDate);
  if (loginMethod.loginMethodIdx === 0) {
    await assert.emailIsAvailable(email);
    const user = await admin.auth().createUser({ email, password });
    accountID = user.uid;
  } else {
    accountID = loginMethod.accountID;
    await assert.accountExists(accountID);
    if (shouldUpdatePassword === true)
      await admin.auth().updateUser(accountID, { password });
  }
  const doc = await getResidentsColl().add({
    firstName: resident.firstName,
    lastName: resident.lastName,
    gender: resident.gender,
    isVisible: resident.isVisible,
    birthDate: jsDateToTimestamp(resident.birthDate),
    accountID,
  });
  return {
    residentID: doc.id,
  };
};

export default createResident;
