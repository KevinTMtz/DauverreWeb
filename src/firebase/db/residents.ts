import { firestore } from 'firebase/app';

import { db } from '../app';
import { statsCollection, increment } from './stats';

const residentsCollection = db.collection('residents');

export const getResidents = async (): Promise<Resident[]> => {
  const snapshot = await residentsCollection.get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      residentID: doc.id,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      isVisible: data.isVisible,
      birthDate: data.birthDate.toDate(),
      accountID: data.accountID,
    };
  });
};

export const getResident = async (
  residentID: string,
): Promise<SuccessAndResident | NotFoundState> => {
  const doc = await residentsCollection.doc(residentID).get();
  if (!doc.exists) return { state: 'not found' };
  const data = doc.data() as firestore.DocumentData;
  return {
    state: 'success',
    resident: {
      residentID: doc.id,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      isVisible: data.isVisible,
      birthDate: data.birthDate.toDate(),
    },
    account: {
      loginMethodIdx: 1,
      accountID: data.accountID,
    },
  };
};

export const deleteResident = async (residentID: string): Promise<void> => {
  await residentsCollection.doc(residentID).delete();
  await statsCollection
    .doc('residentsOperationsCount')
    .update({ deletions: increment });
};
