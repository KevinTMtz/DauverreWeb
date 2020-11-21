import { firestore } from 'firebase/app';

import { db } from '../app';

const residentsCollection = db.collection('residents');

export const getResidents = async (uid?: string): Promise<Resident[]> => {
  const residentsColl =
    typeof uid !== 'string'
      ? residentsCollection
      : residentsCollection.where('accountID', '==', uid);
  const snapshot = await residentsColl.get();
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
