import { db } from '../app';
import { firestore } from 'firebase/app';

export const statsCollection = db.collection('stats');

export const increment = (incrementNum: number) =>
  firestore.FieldValue.increment(incrementNum);
export const decrement = (decrementNum: number) =>
  firestore.FieldValue.increment(decrementNum * -1);

export const getStatsDoc = async (): Promise<
  SuccessAndStats | FirebaseErrorState
> => {
  try {
    const collection = await statsCollection.get();
    return {
      state: 'success',
      statsCollection: collection.docs.map((doc) => {
        return { statsName: doc.id, ...doc.data() };
      }),
    };
  } catch (error) {
    return {
      state: 'firebase error',
      code: error.code,
      message: error.message,
    };
  }
};

export const restartOperationsCount = async (): Promise<
  SuccessState | FirebaseErrorState
> => {
  try {
    await statsCollection
      .doc('postsOperationsCount')
      .update({ deletions: 0, registrations: 0, updates: 0 });
    await statsCollection
      .doc('residentsOperationsCount')
      .update({ deletions: 0, registrations: 0, updates: 0 });
    return {
      state: 'success',
    };
  } catch (error) {
    return {
      state: 'firebase error',
      code: error.code,
      message: error.message,
    };
  }
};
