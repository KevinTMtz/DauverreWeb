import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import { residentsColl } from '../firestore';
import { FirestoreResident } from '../types';
import { dateToPass } from '../util';

const resetPasswordAcc = async (data: any, context: https.CallableContext) => {
  // assertIsAdmin(context);
  const { accountID, residentID } = data;
  const residentDoc = await residentsColl.doc(residentID).get();
  if (!residentDoc.exists)
    throw new https.HttpsError(
      'not-found',
      `No se encontró un residente con el id ${residentID}`,
    );
  const {
    birthDate,
    accountID: resAccountID,
  } = residentDoc.data() as FirestoreResident;
  if (accountID !== resAccountID)
    throw new https.HttpsError(
      'invalid-argument',
      `El id de la cuenta del residente (${resAccountID}) no coincide con el id de la cuenta (${accountID})`,
    );
  await admin.auth().updateUser(accountID, {
    password: dateToPass(birthDate.toDate()),
  });
};

export default resetPasswordAcc;
