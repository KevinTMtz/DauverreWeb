import { logger, firestore, EventContext } from 'firebase-functions';
import * as admin from 'firebase-admin';

const deleteResidentFamiliarAccount = async (
  _: firestore.QueryDocumentSnapshot,
  context: EventContext,
) => {
  try {
    const uid: string = context.params.residentID;
    logger.info(
      `Deleting resident relative account for resident with ID ${uid}`,
    );
    await admin.auth().deleteUser(uid);
    logger.info(
      `Successfully deleted resident relative account for resident with ID ${uid}`,
    );
  } catch (err) {
    logger.error(err);
  }
};

export default deleteResidentFamiliarAccount;
