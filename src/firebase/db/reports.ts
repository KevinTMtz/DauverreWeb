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
): Promise<Report | NotFoundError> => {
  const doc = await reportsCollection(residentID).doc(reportID).get();
  if (!doc.exists) return { notFound: true };
  const data = doc.data() as firestore.DocumentData;
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
};

export const createReport = async (
  residentID: string,
  reportData: ReportData,
): Promise<SuccessMessage | ValidationErrors> => {
  try {
    const validatedReport = (await reportDocSchema.validate(
      reportData,
    )) as ReportData;
    const date = firestore.Timestamp.fromDate(validatedReport.date);
    const doc = await reportsCollection(residentID).add({
      ...validatedReport,
      date,
    });
    return { success: true, url: `/residents/${residentID}/reports/${doc.id}` };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
    console.error(error);
    return error;
  }
};

export const updateReport = async (
  report: Report,
): Promise<SuccessMessage | NotFoundError> => {
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
      success: true,
      url: `/residents/${residentID}/reports/${reportID}`,
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
    console.error(error);
    return error;
  }
};

export const deleteReport = async (
  residentID: string,
  reportID: string,
): Promise<SuccessMessage | NotFoundError> => {
  await reportsCollection(residentID).doc(reportID).delete();
  return { success: true, url: `/residents/${residentID}/reports` };
};
