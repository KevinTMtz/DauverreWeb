import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

// import { assertIsAdmin } from '../util';

const createAdmin = async (data: any, context: https.CallableContext) => {
  // assertIsAdmin(context);
  const { uid } = data;
  await admin.auth().setCustomUserClaims(uid, { admin: true });
};

export default createAdmin;
