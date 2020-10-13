const reports: Report[] = [
  {
    _id: 'rep1',
    residentID: '1',
    date: Date.now(),
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
    _id: 'rep2',
    residentID: '2',
    date: Date.now(),
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
    _id: 'rep3',
    residentID: '1',
    date: Date.now(),
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
    _id: 'rep4',
    residentID: '2',
    date: Date.now(),
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
