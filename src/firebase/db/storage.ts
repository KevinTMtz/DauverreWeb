import { storage } from '../app';

const storageRef = storage.ref();

export const getFileLink = async (
  path: string,
): Promise<SuccessAndURL | FirebaseErrorState> => {
  try {
    const fileRef = storageRef.child(path);
    const publicLink: string = await fileRef.getDownloadURL();
    return { state: 'success', url: publicLink };
  } catch (error) {
    return {
      state: 'firebase error',
      code: error.code,
      message: error.message,
    };
  }
};

export const uploadFile = async (
  path: string,
  file: File,
): Promise<SuccessAndURL | FirebaseErrorState> => {
  try {
    const fileRef = storageRef.child(path);
    await fileRef.put(file);
    const publicLink: string = await fileRef.getDownloadURL();
    return { state: 'success', url: publicLink };
  } catch (error) {
    return {
      state: 'firebase error',
      code: error.code,
      message: error.message,
    };
  }
};

export const deleteFile = async (
  path: string,
): Promise<SuccessState | FirebaseErrorState> => {
  try {
    const fileRef = storageRef.child(path);
    await fileRef.delete();
    return { state: 'success' };
  } catch (error) {
    return {
      state: 'firebase error',
      code: error.code,
      message: error.message,
    };
  }
};
