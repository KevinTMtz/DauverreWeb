import { functions } from './app';

export const resetPasswordFromAccount = async (
  accountID: string,
): Promise<any> => {
  const cloudFun = functions.httpsCallable(`/api/users/reset/${accountID}`);
  const { data } = await cloudFun();
  return data;
};
