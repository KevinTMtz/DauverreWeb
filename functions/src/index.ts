import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import changeTelephone from './functions/changeTelephone';
import createAdmin from './functions/createAdmin';
import createResident from './functions/createResident';
import listResFamAccounts from './functions/listResFamAccounts';
import resetPasswordAcc from './functions/resetPasswordAcc';
import updateResident from './functions/updateResident';

admin.initializeApp();

export const changeTelephoneF = functions.https.onCall(changeTelephone);
export const createAdminF = functions.https.onCall(createAdmin);
export const createResidentF = functions.https.onCall(createResident);
export const listResFamAccountsF = functions.https.onCall(listResFamAccounts);
export const resetPasswordAccF = functions.https.onCall(resetPasswordAcc);
export const updateResidentF = functions.https.onCall(updateResident);
