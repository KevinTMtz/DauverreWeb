import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import * as assert from '../assert';
import { phoneToMail, telephoneIsValid } from '../util';

const changeTelephone = async (data: any, context: https.CallableContext) => {
  assert.isAdmin(context);
  const { accountID, telephone } = data;
  if (!telephoneIsValid(telephone))
    throw new https.HttpsError('invalid-argument', 'Teléfono no válido');
  const email = phoneToMail(telephone);
  await Promise.all([
    assert.accountExists(accountID),
    assert.emailIsAvailable(email),
  ]);
  await admin.auth().updateUser(accountID, { email });
};

export default changeTelephone;
