import { Request, Response } from 'express';
import { logger } from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Resident } from '../types';
import { dateToPass } from '../util';

const resetPasswordResidentFamAcc = async (req: Request, res: Response) => {
  try {
    const uid: string = req.params.uid;
    const residentDoc = await admin.firestore().doc(`residents/${uid}`).get();
    if (!residentDoc.exists) {
      return res
        .status(200)
        .send({ error: `El documento con id ${uid} no existe` });
    }
    const { birthDate } = residentDoc.data() as Resident;
    await admin.auth().updateUser(uid, {
      password: dateToPass(birthDate.toDate()),
    });
    logger.info(
      `Succesfully reset resident relative account password with uid ${uid}`,
    );
    return res.status(200).send({ success: true });
  } catch (err) {
    return res.status(200).send({ error: err.message, errcode: err.code });
  }
};

export default resetPasswordResidentFamAcc;
