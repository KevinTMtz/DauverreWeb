import { reportDocSchema } from './validation';

const reports: Report[] = [
  {
    residentID: '1',
    reportID: 'rep1',
    date: new Date(Date.now()),
    mood: 1,
    health: 4,
    sad: true,
    angry: false,
    rested: true,
    wellFed: true,
    lonely: true,
    comments: 'Un rifado',
  },
  {
    residentID: '2',
    reportID: 'rep2',
    date: new Date(Date.now()),
    mood: 4,
    health: 1,
    sad: false,
    angry: true,
    rested: false,
    wellFed: false,
    lonely: false,
    comments: 'Un rifado',
  },
  {
    residentID: '1',
    reportID: 'rep3',
    date: new Date(Date.now()),
    mood: 1,
    health: 3,
    sad: true,
    angry: false,
    rested: true,
    wellFed: true,
    lonely: true,
    comments: 'Un rifado',
  },
  {
    residentID: '2',
    reportID: 'rep4',
    date: new Date(Date.now()),
    mood: 5,
    health: 5,
    sad: true,
    angry: false,
    rested: true,
    wellFed: true,
    lonely: true,
    comments: 'Un rifado',
  },
];

export const getReports = async (residentID: string): Promise<Report[]> => {
  return reports.filter((rep) => rep.residentID === residentID);
};

export const getReport = async (
  residentID: string,
  reportID: string,
): Promise<Report | NotFoundError> => {
  const report = reports
    .filter((rep) => rep.residentID === residentID)
    .find((r) => r.reportID === reportID);
  return report ? report : { notFound: true };
};

export const createReport = async (
  reportData: ReportData,
): Promise<SuccessMessage | ValidationErrors> => {
  try {
    const validatedReport = await reportDocSchema.validate(reportData);
    console.log('Creating report:', validatedReport);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
  }
  return { success: true };
};

export const updateReport = async (
  report: Report,
): Promise<SuccessMessage | NotFoundError> => {
  try {
    const { residentID, reportID } = report;
    const validatedReport = await reportDocSchema.validate(report);
    console.log(
      'Updating report',
      reportID,
      'from resident ',
      residentID,
      'with info',
      validatedReport,
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
  }
  return { success: true };
};

export const deleteReport = async (
  residentID: string,
  reportID: string,
): Promise<SuccessMessage | NotFoundError> => {
  console.log('Deleting report', reportID, 'from resident', residentID);
  return { success: true };
};
