import { Request, Response, NextFunction } from 'express';
import { logger } from 'firebase-functions';

const logging = (req: Request, _: Response, next: NextFunction) => {
  logger.info(`${req.method} to ${req.url} with data`, req.body);
  next();
};

export default logging;
