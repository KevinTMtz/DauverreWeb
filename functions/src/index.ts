import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import { json } from 'body-parser';

import {
  createResidentFamiliarAccount,
  resetPasswordResidentFamAcc,
} from './functions';
import { isAuthenticatedAsAdmin, logging } from './middleware';

admin.initializeApp();

const app = express();
app.use(json());
app.use(cors({ origin: true }));
app.use(logging);
app.use(isAuthenticatedAsAdmin);

app.use('/users/reset/:uid', resetPasswordResidentFamAcc);

export const api = functions.https.onRequest(app);

export const createResidentsRelativeAccount = functions.firestore
  .document('residents/{residentID}')
  .onCreate(createResidentFamiliarAccount);
