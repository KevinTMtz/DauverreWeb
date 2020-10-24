const posts: Post[] = [
  {
    _id: '1234',
    title: 'Post falso 1',
    date: Date.now(),
    content:
      '### Lorem ipsum\n\ndolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n\n * labore\n * et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat **nulla pariatur**. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/D%27Urville_Island%2C_New_Zealand_%28Unsplash%29.jpg/1024px-D%27Urville_Island%2C_New_Zealand_%28Unsplash%29.jpg',
  },
  {
    _id: '2345',
    title: 'Post falso 2',
    date: Date.now(),
    content:
      '### Lorem ipsum\n\ndolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n\n * labore\n * et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat **nulla pariatur**. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/D%27Urville_Island%2C_New_Zealand_%28Unsplash%29.jpg/1024px-D%27Urville_Island%2C_New_Zealand_%28Unsplash%29.jpg',
  },
];

export const getPosts = async (): Promise<Post[]> => posts;
