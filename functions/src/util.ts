import { Request, Response, NextFunction } from 'express';
import * as functions from 'firebase-functions';

export const phoneToMail = (phone: string): string => `${phone}@example.com`;

export const dateToPass = (date: Date): string => {
  return Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .formatToParts(date)
    .filter((part) => part.type !== 'literal')
    .join('');
};

export const logger = (req: Request, _: Response, next: NextFunction) => {
  functions.logger.info(`${req.method} to ${req.url} with data`, req.body);
  next();
};
