import { db } from '../app';
import { firestore } from 'firebase/app';

export const statsCollection = db.collection('stats');

export const increment = firestore.FieldValue.increment(1);
export const decrement = firestore.FieldValue.increment(1);

export const getStatsDoc = async (): Promise<SuccessAndStats> => {
  const collection = await statsCollection.get();
  return {
    state: 'success',
    statsCollection: collection.docs.map((doc) => {
      return { statsName: doc.id, ...doc.data() };
    }),
  };
};
