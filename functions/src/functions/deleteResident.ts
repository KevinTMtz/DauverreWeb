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

  const residentRef = getResidentsColl().doc(residentID);
  const residentDoc = await residentRef.get();
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
  // Remove reports
  const query = residentRef
    .collection('reports')
    .orderBy('__name__')
    .limit(100);
  while (true) {
    const snapshot = await query.get();
    if (snapshot.size === 0) break;
    const batch = admin.firestore().batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }

  // Remove resident document
  await residentRef.delete();
};

export default deleteResident;
