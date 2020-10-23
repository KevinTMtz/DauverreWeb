import { logger, firestore, EventContext } from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Resident } from './types';
import { dateToPass, phoneToMail } from './util';

const createResidentFamiliarAccount = async (
  snapshot: firestore.QueryDocumentSnapshot,
  context: EventContext,
) => {
  try {
    const uid: string = context.params.residentID;
    logger.info(
      `Creating resident relative account for resident with ID ${uid}`,
    );
    const { telephone, birthDate } = snapshot.data() as Resident;
    await admin.auth().createUser({
      uid,
      email: phoneToMail(telephone),
      password: dateToPass(birthDate.toDate()),
    });
    logger.info(
      `Created resident relative account for resident with ID ${uid}`,
    );
  } catch (err) {
    logger.error(err);
  }
};

export default createResidentFamiliarAccount;
