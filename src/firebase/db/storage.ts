import { storage } from '../app';

const storageRef = storage.ref();

export const getFileLink = async (
  path: string,
): Promise<SuccessMessage | NotFoundError> => {
  try {
    const fileRef = storageRef.child(path);

    const publicLink = await fileRef
      .getDownloadURL()
      .then((value: string) => value);

    return { success: true, url: publicLink };
  } catch (error) {
    if (error.code === 'unauthorized') {
      return error.errors;
    }
    console.error(error);
    return error;
  }
};

export const uploadFile = async (
  path: string,
  file: File,
): Promise<SuccessMessage | UnableToUploadFile> => {
  try {
    const fileRef = storageRef.child(path);
    await fileRef.put(file);

    const publicLink = await fileRef
      .getDownloadURL()
      .then((value: string) => value);

    return { success: true, url: publicLink };
  } catch (error) {
    if (error.code === 'unauthorized') {
      return error.errors;
    }
    console.error(error);
    return error;
  }
};

export const deleteFile = async (path: string): Promise<SuccessMessage> => {
  try {
    const fileRef = storageRef.child(path);

    return fileRef.delete().then((value) => value);
  } catch (error) {
    if (error.code === 'unauthorized') {
      return error.errors;
    }
    console.error(error);
    return error;
  }
};
