import * as admin from 'firebase-admin';

export const getResidentsColl = () => admin.firestore().collection('residents');
