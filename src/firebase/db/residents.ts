import { firestore } from 'firebase/app';

import { db } from '../app';
import { residentDocSchema } from './validation';

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
      telephone: data.telephone,
    };
  });
};

export const getResident = async (
  residentID: string,
): Promise<Resident | NotFoundError> => {
  const doc = await residentsCollection.doc(residentID).get();
  if (!doc.exists) return { notFound: true };
  const data = doc.data() as firestore.DocumentData;
  return {
    residentID: doc.id,
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    isVisible: data.isVisible,
    birthDate: data.birthDate.toDate(),
    telephone: data.telephone,
  };
};

export const createResident = async (
  residentData: ResidentData,
): Promise<SuccessMessage | ValidationErrors> => {
  try {
    const validatedResident = (await residentDocSchema.validate(
      residentData,
    )) as ResidentData;
    validatedResident.birthDate.setHours(12, 1);
    const birthDate = firestore.Timestamp.fromDate(validatedResident.birthDate);
    const doc = await residentsCollection.add({
      ...validatedResident,
      birthDate,
    });
    return { success: true, url: `/residents/${doc.id}` };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
    console.error(error);
    return error;
  }
};

export const updateResident = async (
  resident: Resident,
): Promise<SuccessMessage | NotFoundError> => {
  try {
    const { residentID } = resident;
    const validatedResident = (await residentDocSchema.validate(
      resident,
    )) as ResidentData;
    validatedResident.birthDate.setHours(12, 1);
    const birthDate = firestore.Timestamp.fromDate(validatedResident.birthDate);
    await residentsCollection.doc(residentID).update({
      ...validatedResident,
      birthDate,
    });
    return { success: true, url: `/residents/${residentID}` };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
    console.error(error);
    return error;
  }
};

export const deleteResident = async (
  residentID: string,
): Promise<SuccessMessage | NotFoundError> => {
  await residentsCollection.doc(residentID).delete();
  return { success: true, url: '/residents' };
};
