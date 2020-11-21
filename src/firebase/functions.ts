import { functions } from './app';
import { statsCollection, increment, decrement } from './db/stats';

export const resetPasswordFromAccount = async (
  accountID: string,
  residentID: string,
): Promise<SuccessState | NotFoundState | FirebaseErrorState> => {
  const cloudFun = functions.httpsCallable('resetPasswordAccF');
  try {
    await cloudFun({ accountID, residentID });
    return { state: 'success' };
  } catch (err) {
    return { state: 'firebase error', ...err } as FirebaseErrorState;
  }
};

export const listAccounts = async (): Promise<
  SuccessAndAccountListings | FirebaseErrorState
> => {
  const cloudFun = functions.httpsCallable('listResFamAccountsF');
  try {
    const { data } = await cloudFun();
    return {
      state: 'success',
      accounts: data,
    };
  } catch (err) {
    return { state: 'firebase error', ...err } as FirebaseErrorState;
  }
};

export const createResident = async (
  resident: ResidentData,
  loginMethod: ResidentFamLoginMethod,
): Promise<SuccessAndURL | ValidationErrorsState | FirebaseErrorState> => {
  const cloudFun = functions.httpsCallable('createResidentF');
  try {
    const { data } = await cloudFun({
      resident: { ...resident, birthDate: JSON.stringify(resident.birthDate) },
      loginMethod,
    });
    await statsCollection
      .doc('residentsOperationsCount')
      .update({ registrations: increment(1) });
    await statsCollection
      .doc('generalCount')
      .update({ totalResidents: increment(1) });
    return { state: 'success', url: `/residents/${data.residentID}` };
  } catch (err) {
    switch (err.code) {
      case 'invalid-argument':
        return {
          state: 'validation errors',
          errors: ['Falló la validación en el servidor'],
        };
      case 'already-exists':
      case 'failed-precondition':
        return { state: 'validation errors', errors: [err.message] };
      default:
        return { state: 'firebase error', ...err } as FirebaseErrorState;
    }
  }
};

export const updateResident = async (
  resident: ResidentData,
  loginMethod: ResidentFamLoginMethod,
): Promise<SuccessState | ValidationErrorsState | FirebaseErrorState> => {
  const cloudFun = functions.httpsCallable('updateResidentF');
  try {
    await cloudFun({
      resident: { ...resident, birthDate: JSON.stringify(resident.birthDate) },
      loginMethod,
    });
    await statsCollection
      .doc('residentsOperationsCount')
      .update({ updates: increment(1) });
    return { state: 'success' };
  } catch (err) {
    switch (err.code) {
      case 'invalid-argument':
        return {
          state: 'validation errors',
          errors: ['Falló la validación en el servidor'],
        };
      case 'already-exists':
      case 'failed-precondition':
        return { state: 'validation errors', errors: [err.message] };
      default:
        return { state: 'firebase error', ...err } as FirebaseErrorState;
    }
  }
};

export const deleteResident = async (
  residentID: string,
): Promise<SuccessState | FirebaseErrorState> => {
  const cloudFun = functions.httpsCallable('deleteResidentF');
  try {
    const { data } = await cloudFun({ residentID });
    await statsCollection.doc('generalCount').update({
      totalResidents: decrement(1),
      totalReports: decrement(data.numReports),
    });
    return { state: 'success' };
  } catch (err) {
    return { state: 'firebase error', ...err } as FirebaseErrorState;
  }
};

export const changeTelephone = async (
  accountID: string,
  telephone: string,
): Promise<SuccessState | ValidationErrorsState | FirebaseErrorState> => {
  const cloudFun = functions.httpsCallable('changeTelephoneF');
  try {
    await cloudFun({ accountID, telephone });
    return { state: 'success' };
  } catch (err) {
    switch (err.code) {
      case 'already-exists':
        return {
          state: 'validation errors',
          errors: ['Ya existe una cuenta con ese correo'],
        };
      default:
        return { state: 'firebase error', ...err } as FirebaseErrorState;
    }
  }
};
