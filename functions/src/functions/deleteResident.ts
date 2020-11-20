import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import * as assert from '../assert';
import { getResidentsColl } from '../firestore';
import { FirestoreResident } from '../types';
import { accountHasMultipleResidents } from '../util';

const deleteResident = async (data: any, context: https.CallableContext) => {
  // assert.isAdmin(context);
  const { residentID: r } = data;
  const residentID = r as string;
  if (typeof residentID !== 'string')
    throw new https.HttpsError(
      'invalid-argument',
      'No se enviaron los argumentos correctos',
    );

  const residentDoc = await getResidentsColl().doc(residentID).get();
  if (!residentDoc.exists)
    throw new https.HttpsError(
      'not-found',
      `No se encontró un residente con el id ${residentID}`,
    );
  const resident = residentDoc.data() as FirestoreResident;
  const accountID = resident.accountID;
  await assert.accountExists(accountID);

  if (!(await accountHasMultipleResidents(accountID))) {
    await admin.auth().deleteUser(accountID);
  }
  await getResidentsColl().doc(residentID).delete();
};

export default deleteResident;
