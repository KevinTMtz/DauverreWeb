import * as admin from 'firebase-admin';
import * as yup from 'yup';

import { CreateResidentData, ResidentFamLoginMethod } from './types';

export const phoneToMail = (phone: string): string => `${phone}@example.com`;

export const dateToPass = (date: Date): string => {
  return Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .formatToParts(date)
    .filter((part) => part.type !== 'literal')
    .map((part) => part.value)
    .join('');
};

export const jsDateToTimestamp = (date: Date) =>
  admin.firestore.Timestamp.fromDate(date);

export const joinStringsAsList = (list: string[]): string => {
  let name = list.pop() || '';
  if (list.length >= 1) {
    name = `${list.pop()} y ${name}`;
  }
  while (list.length !== 0) {
    name = `${list.pop()}, ${name}`;
  }
  return name;
};

export const validateResidentData = async (
  resident: CreateResidentData,
): Promise<boolean> => {
  resident.birthDate.setHours(12, 1);
  const residentDocSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    birthDate: yup.date().required(),
    gender: yup.string().required(),
    isVisible: yup.boolean().default(true),
  });
  return residentDocSchema.isValid(resident);
};

export const validateLoginMethod = (
  loginMethod: ResidentFamLoginMethod,
): boolean => {
  if (loginMethod.loginMethodIdx === 0)
    return /^\d{10}$/.test(loginMethod.telephone);
  return loginMethod.loginMethodIdx === 1;
};
