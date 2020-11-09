import * as admin from 'firebase-admin';

interface BasicResident {
  firstName: string;
  lastName: string;
  gender: string;
  isVisible: boolean;
}

export interface FirestoreResident extends BasicResident {
  birthDate: admin.firestore.Timestamp;
  accountID: string;
}

export interface CreateResidentData extends BasicResident {
  birthDate: Date;
}

export interface ResidentFamNewAccount {
  loginMethodIdx: 0;
  telephone: string;
}

export interface ResidentFamExistingAccount {
  loginMethodIdx: 1;
  accountID: string;
}

export type ResidentFamLoginMethod =
  | ResidentFamNewAccount
  | ResidentFamExistingAccount;
