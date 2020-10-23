import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import { json } from 'body-parser';

import createResidentFamiliarAccount from './createResidentFamiliarAccount';
import { logger } from './util';
import resetPasswordResidentFamAcc from './resetPasswordResidentFamAcc';

admin.initializeApp();

const app = express();
app.use(json());
app.use(cors({ origin: true }));
app.use(logger);

app.use('/users/reset/:uid', resetPasswordResidentFamAcc);

export const api = functions.https.onRequest(app);

export const createResidentsRelativeAccount = functions.firestore
  .document('residents/{residentID}')
  .onCreate(createResidentFamiliarAccount);
