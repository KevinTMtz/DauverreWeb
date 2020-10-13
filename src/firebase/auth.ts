export const signInWithCredentials = async (
  username: string,
  password: string,
): Promise<{ user: string } | { error: string }> => {
  if (password === 'uwu') return { user: username || 'soy admin' };
  return { error: 'Usuario o contraseña no válidos' };
};
