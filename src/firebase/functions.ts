import { functions } from './app';

export const resetPasswordFromAccount = async (
  accountID: string,
  residentID: string,
): Promise<SuccessState | NotFoundState | FirebaseErrorState> => {
  const cloudFun = functions.httpsCallable('resetPasswordAccF');
  try {
    await cloudFun({ accountID, residentID });
    return { state: 'success' };
  } catch (err) {
    switch (err.code) {
      case 'not-found':
        return { state: 'not found', message: err.message };
      default:
        return { state: 'firebase error', ...err } as FirebaseErrorState;
    }
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
  shouldUpdatePassword: boolean,
): Promise<SuccessAndURL | ValidationErrorsState | FirebaseErrorState> => {
  const cloudFun = functions.httpsCallable('createResidentF');
  console.log({ resident, loginMethod, shouldUpdatePassword });
  try {
    const { data } = await cloudFun({
      resident: { ...resident, birthDate: JSON.stringify(resident.birthDate) },
      loginMethod,
      shouldUpdatePassword,
    });
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
  shouldUpdatePassword: boolean,
): Promise<SuccessState | ValidationErrorsState | FirebaseErrorState> => {
  const cloudFun = functions.httpsCallable('updateResidentF');
  try {
    await cloudFun({
      resident: { ...resident, birthDate: JSON.stringify(resident.birthDate) },
      loginMethod,
      shouldUpdatePassword,
    });
    return { state: 'success' };
  } catch (err) {
    console.log(err);
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
