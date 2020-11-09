import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

export const isAdmin = (context: https.CallableContext) => {
  if (context.auth === undefined || context.auth.token.admin !== true)
    throw new https.HttpsError(
      'permission-denied',
      'Llamada sin la autorización necesaria',
    );
};

export const emailIsAvailable = async (email: string) => {
  let thereIsAlreadyAnAccount = true;
  try {
    await admin.auth().getUserByEmail(email);
  } catch (error) {
    thereIsAlreadyAnAccount = false;
  }
  if (thereIsAlreadyAnAccount)
    throw new https.HttpsError(
      'already-exists',
      'Ya existe una cuenta con ese teléfono',
    );
};

export const accountExists = async (accountID: string) => {
  try {
    await admin.auth().getUser(accountID);
  } catch (error) {
    throw new https.HttpsError(
      'failed-precondition',
      `No existe una cuenta con el id ${accountID}`,
    );
  }
};
