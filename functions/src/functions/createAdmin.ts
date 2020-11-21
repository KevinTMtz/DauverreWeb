import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import * as assert from '../assert';

const createAdmin = async (data: any, context: https.CallableContext) => {
  assert.isAdmin(context);
  const { uid } = data;
  await admin.auth().setCustomUserClaims(uid, { admin: true });
};

export default createAdmin;
