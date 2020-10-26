import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

const isAuthenticatedAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    logger.info('Unauthenticated call, dropping');
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const split = authorization.split('Bearer ');
  if (split.length !== 2) {
    logger.info('Unauthenticated call, dropping');
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const encodedToken = split[1];
  try {
    const token = await admin.auth().verifyIdToken(encodedToken);
    if (token.admin === true) return next();
    else {
      logger.info('Unauthorized call, dropping');
      return res.status(403).send();
    }
  } catch (err) {
    logger.info('Unauthorized call, dropping');
    return res.status(401).send({ message: 'Unauthorized' });
  }
};

export default isAuthenticatedAsAdmin;
