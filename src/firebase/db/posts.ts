import { firestore } from 'firebase/app';

import { db } from '../app';
import { postDocSchema } from './validation';

const postsCollection = db.collection('posts');

export const getPosts = async (): Promise<Post[]> => {
  const snapshot = await postsCollection.get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      postID: doc.id,
      title: data.title,
      date: data.date.toDate(),
      content: data.content.replaceAll('\\n', '\n'),
      imageUrl: data.imageUrl,
    };
  });
};

export const getPost = async (
  postID: string,
): Promise<SuccessAndPost | NotFoundState> => {
  const doc = await postsCollection.doc(postID).get();
  if (!doc.exists) return { state: 'not found' };
  const data = doc.data() as firestore.DocumentData;
  return {
    state: 'success',
    post: {
      postID: doc.id,
      title: data.title,
      date: data.date.toDate(),
      content: data.content.replaceAll('\\n', '\n'),
      imageUrl: data.imageUrl,
    },
  };
};

export const createPost = async (
  postData: PostData,
  postID: string,
): Promise<SuccessAndURL | ValidationErrorsState | FirebaseErrorState> => {
  try {
    const validatedPost = (await postDocSchema.validate(postData)) as PostData;
    await postsCollection.doc(postID).set({
      ...validatedPost,
      date: firestore.Timestamp.fromDate(validatedPost.date),
    });
    return { state: 'success', url: `/posts/${postID}` };
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

export const updatePost = async (
  post: Post,
): Promise<SuccessAndURL | ValidationErrorsState | FirebaseErrorState> => {
  try {
    const { postID } = post;
    const validatedPost = (await postDocSchema.validate(post)) as PostData;
    await postsCollection.doc(postID).update({
      ...validatedPost,
      date: firestore.Timestamp.fromDate(validatedPost.date),
    });
    return { state: 'success', url: `/posts/${postID}` };
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

export const deletePost = async (postID: string): Promise<SuccessAndURL> => {
  await postsCollection.doc(postID).delete();
  return { state: 'success', url: '/posts' };
};
