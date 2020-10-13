const residents: Resident[] = [
  {
    _id: '1',
    firstName: 'El',
    lastName: 'Kevin',
    gender: 'Macho',
    isVisible: false,
    age: 69,
  },
  {
    _id: '2',
    firstName: 'Seb',
    lastName: 'iti',
    gender: 'Diario',
    isVisible: true,
    age: 12,
  },
];

export const getResidents = async (): Promise<Resident[]> => residents;
