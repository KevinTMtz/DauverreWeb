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
      telephone: data.telephone,
    },
  };
};

export const createResident = async (
  residentData: ResidentData,
): Promise<SuccessAndURL | ValidationErrorsState | FirebaseErrorState> => {
  try {
    const validatedResident = (await residentDocSchema.validate(
      residentData,
    )) as ResidentData;
    validatedResident.birthDate.setHours(12, 1);
    validatedResident.telephone = validatedResident.telephone
      .split('')
      .filter((ch) => /\d/.test(ch))
      .join('');
    const birthDate = firestore.Timestamp.fromDate(validatedResident.birthDate);
    const doc = await residentsCollection.add({
      ...validatedResident,
      birthDate,
    });
    return { state: 'success', url: `/residents/${doc.id}` };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return {
        state: 'validation errors',
        errors: error.errors,
      };
    }
    return {
      state: 'firebase error',
      code: error.code,
      message: error.message,
    };
  }
};

export const updateResident = async (
  resident: Resident,
): Promise<SuccessAndURL | ValidationErrorsState | FirebaseErrorState> => {
  try {
    const { residentID } = resident;
    const validatedResident = (await residentDocSchema.validate(
      resident,
    )) as ResidentData;
    validatedResident.birthDate.setHours(12, 1);
    validatedResident.telephone = validatedResident.telephone
      .split('')
      .filter((ch) => /\d/.test(ch))
      .join('');
    const birthDate = firestore.Timestamp.fromDate(validatedResident.birthDate);
    await residentsCollection.doc(residentID).update({
      ...validatedResident,
      birthDate,
    });
    return { state: 'success', url: `/residents/${residentID}` };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return {
        state: 'validation errors',
        errors: error.errors,
      };
    }
    return {
      state: 'firebase error',
      code: error.code,
      message: error.message,
    };
  }
};

export const deleteResident = async (residentID: string): Promise<void> => {
  await residentsCollection.doc(residentID).delete();
};
