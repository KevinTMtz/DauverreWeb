import { residentDocSchema } from './validation';

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

export const getResident = async (
  residentID: string,
): Promise<Resident | NotFoundError> => {
  const resident = residents.find((r) => r._id === residentID);
  return resident ? resident : { notFound: true };
};

export const createResident = async (
  residentData: ResidentData,
): Promise<SuccessMessage | ValidationErrors> => {
  try {
    const validatedResident = await residentDocSchema.validate(residentData);
    console.log('Creating resident:', validatedResident);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
  }
  return { success: true };
};

export const updateResident = async (
  resident: Resident,
): Promise<SuccessMessage | NotFoundError> => {
  try {
    const residentID = resident._id;
    const validatedResident = await residentDocSchema.validate(resident);
    console.log(
      'Updating resident with ID',
      residentID,
      'with info',
      validatedResident,
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
  }
  return { success: true };
};

export const deleteResident = async (
  residentID: string,
): Promise<SuccessMessage | NotFoundError> => {
  console.log('Deleting resident:', residentID);
  return { success: true };
};
