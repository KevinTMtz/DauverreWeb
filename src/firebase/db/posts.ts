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
): Promise<Post | NotFoundError> => {
  const doc = await postsCollection.doc(postID).get();
  if (!doc.exists) return { notFound: true };
  const data = doc.data() as firestore.DocumentData;
  return {
    postID: doc.id,
    title: data.title,
    date: data.date.toDate(),
    content: data.content.replaceAll('\\n', '\n'),
    imageUrl: data.imageUrl,
  };
};

export const createPost = async (
  postData: PostData,
): Promise<SuccessMessage | ValidationErrors> => {
  try {
    const validatedPost = (await postDocSchema.validate(postData)) as PostData;
    const doc = await postsCollection.add(validatedPost);
    return { success: true, url: `/posts/${doc.id}` };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
    return error;
  }
};

export const updatePost = async (
  post: Post,
): Promise<SuccessMessage | NotFoundError> => {
  try {
    const { postID } = post;
    const validatedPost = (await postDocSchema.validate(post)) as PostData;
    await postsCollection.doc(postID).update(validatedPost);
    return { success: true, url: `/posts/${postID}` };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
    return error;
  }
};

export const deletePost = async (postID: string): Promise<SuccessMessage> => {
  await postsCollection.doc(postID).delete();
  return { success: true, url: '/posts' };
};
