import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import * as assert from '../assert';
import { getResidentsColl } from '../firestore';
import { CreateResidentData, ResidentFamLoginMethod } from '../types';
import {
  dateToPass,
  jsDateToTimestamp,
  phoneToMail,
  validateLoginMethod,
  validateResidentData,
} from '../util';

const createResident = async (data: any, context: https.CallableContext) => {
  // assert.isAdmin(context);
  const { resident: r, loginMethod: l } = data;
  const loginMethod = l as ResidentFamLoginMethod;
  const resident = r as CreateResidentData;
  if (
    !(await validateResidentData(resident)) ||
    !validateLoginMethod(loginMethod)
  )
    throw new https.HttpsError(
      'invalid-argument',
      'No se enviaron los argumentos correctos',
    );

  let accountID: string;
  const password = dateToPass(resident.birthDate);
  if (loginMethod.loginMethodIdx === 0) {
    const email = phoneToMail(loginMethod.telephone);
    await assert.emailIsAvailable(email);
    const user = await admin.auth().createUser({ email, password });
    accountID = user.uid;
  } else {
    accountID = loginMethod.accountID;
    await assert.accountExists(accountID);
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
