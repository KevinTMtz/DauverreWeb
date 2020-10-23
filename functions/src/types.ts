import * as admin from 'firebase-admin';

export interface Resident {
  birthDate: admin.firestore.Timestamp;
  telephone: string;
}
