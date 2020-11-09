import * as admin from 'firebase-admin';

export const residentsColl = admin.firestore().collection('residents');
