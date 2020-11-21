import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import * as assert from '../assert';

const createPsy = async (data: any, context: https.CallableContext) => {
  assert.isAdmin(context);
  const { uid } = data;
  await admin.auth().setCustomUserClaims(uid, { psy: true });
};

export default createPsy;
