import { postDocSchema } from './validation';

const posts: Post[] = [
  {
    postID: '1234',
    title: 'Post falso 1',
    date: Date.now(),
    content:
      '### Lorem ipsum\n\ndolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n\n * labore\n * et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat **nulla pariatur**. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipP3Ll5USMkZfqPJRnKbH1BSFK1XGk5x2r1La6vF=s1016-k-no',
  },
  {
    postID: '2345',
    title: 'Post falso 2',
    date: Date.now(),
    content:
      '### Lorem ipsum\n\ndolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n\n * labore\n * et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat **nulla pariatur**. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipP3Ll5USMkZfqPJRnKbH1BSFK1XGk5x2r1La6vF=s1016-k-no',
  },
  {
    postID: '3456',
    title: 'Post falso 3',
    date: Date.now(),
    content:
      '### Lorem ipsum\n\ndolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n\n * labore\n * et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat **nulla pariatur**. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipP3Ll5USMkZfqPJRnKbH1BSFK1XGk5x2r1La6vF=s1016-k-no',
  },
];

export const getPosts = async (): Promise<Post[]> => posts;

export const getPost = async (
  postID: string,
): Promise<Post | NotFoundError> => {
  const post = posts.find((p) => p.postID === postID);
  return post ? post : { notFound: true };
};

export const createPost = async (
  postData: PostData,
): Promise<SuccessMessage | ValidationErrors> => {
  try {
    const validatedPost = await postDocSchema.validate(postData);
    console.log('Creating post:', validatedPost);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
  }
  return { success: true };
};

export const updatePost = async (
  post: Post,
): Promise<SuccessMessage | NotFoundError> => {
  try {
    const { postID } = post;
    const validatedPost = await postDocSchema.validate(post);
    console.log('Updating post with ID', postID, 'with info', validatedPost);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return error.errors;
    }
  }
  return { success: true };
};

export const deletePost = async (
  postID: string,
): Promise<SuccessMessage | NotFoundError> => {
  console.log('Deleting post:', postID);
  return { success: true };
};
