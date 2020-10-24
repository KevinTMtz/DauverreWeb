const reports: Report[] = [
  {
    _id: 'rep1',
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
    _id: 'rep2',
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
    _id: 'rep3',
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
    _id: 'rep4',
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

export const getReports = async (_residentID: string): Promise<Report[]> => {
  return reports.filter((_rep) => Math.random() > 0.5);
};
