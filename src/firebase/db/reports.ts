import { firestore } from 'firebase/app';

import { db } from '../app';
import { reportDocSchema } from './validation';

const reportsCollection = (residentID: string) =>
  db.collection(`residents/${residentID}/reports`);

export const getReports = async (residentID: string): Promise<Report[]> => {
  const snapshot = await reportsCollection(residentID).get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      reportID: doc.id,
      residentID,
      date: data.date.toDate(),
      mood: data.mood,
      health: data.health,
      sad: data.sad,
      angry: data.angry,
      rested: data.rested,
      wellFed: data.wellFed,
      lonely: data.lonely,
      comments: data.comments,
    };
  });
};

export const getReport = async (
  residentID: string,
  reportID: string,
): Promise<SuccessAndReport | NotFoundState> => {
  const doc = await reportsCollection(residentID).doc(reportID).get();
  if (!doc.exists) return { state: 'not found' };
  const data = doc.data() as firestore.DocumentData;
  return {
    state: 'success',
    report: {
      reportID: doc.id,
      residentID,
      date: data.date.toDate(),
      mood: data.mood,
      health: data.health,
      sad: data.sad,
      angry: data.angry,
      rested: data.rested,
      wellFed: data.wellFed,
      lonely: data.lonely,
      comments: data.comments,
    },
  };
};

export const createReport = async (
  residentID: string,
  reportData: ReportData,
): Promise<SuccessState | ValidationErrorsState | FirebaseErrorState> => {
  try {
    const validatedReport = (await reportDocSchema.validate(
      reportData,
    )) as ReportData;
    const date = firestore.Timestamp.fromDate(validatedReport.date);
    await reportsCollection(residentID).add({
      ...validatedReport,
      date,
    });
    return { state: 'success' };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return {
        state: 'validation errors',
        errors: error.errors,
      };
    }
    return {
      state: 'firebase error',
      code: error.code,
      message: error.message,
    };
  }
};

export const updateReport = async (
  report: Report,
): Promise<SuccessAndURL | ValidationErrorsState | FirebaseErrorState> => {
  try {
    const { residentID, reportID } = report;
    const validatedReport = (await reportDocSchema.validate(
      report,
    )) as ReportData;
    const date = firestore.Timestamp.fromDate(validatedReport.date);
    await reportsCollection(residentID)
      .doc(reportID)
      .update({
        ...validatedReport,
        date,
      });
    return {
      state: 'success',
      url: `/residents/${residentID}/reports/${reportID}`,
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return {
        state: 'validation errors',
        errors: error.errors,
      };
    }
    return {
      state: 'firebase error',
      code: error.code,
      message: error.message,
    };
  }
};

export const deleteReport = async (
  residentID: string,
  reportID: string,
): Promise<SuccessAndURL> => {
  await reportsCollection(residentID).doc(reportID).delete();
  return { state: 'success', url: `/residents/${residentID}/reports` };
};
