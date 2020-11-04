import { auth } from './app';

export const signInWithCredentials = async (
  username: string,
  password: string,
): Promise<SuccessAndURL | AuthenticationError> => {
  const email = username.includes('@') ? username : `${username}@example.com`;
  try {
    const userCred = await auth.signInWithEmailAndPassword(email, password);
    const token = await userCred.user?.getIdTokenResult();
    if (token?.claims.admin) return { state: 'success', url: '/menu' };
    return { state: 'success', url: `/residents/${userCred.user?.uid}` };
  } catch (error) {
    const authMethod = username.includes('@')
      ? 'correo electrónico'
      : 'teléfono';
    switch (error.code) {
      case 'auth/invalid-email':
        return { state: 'auth error', error: 'Usuario no válido' };
      case 'auth/user-disabled':
        return { state: 'auth error', error: 'Usuario deshabilitado' };
      case 'auth/user-not-found':
        return {
          state: 'auth error',
          error: `No existe un usuario con ese ${authMethod}`,
        };
      case 'auth/wrong-password':
        return { state: 'auth error', error: 'Contraseña incorrecta' };
      default:
        console.error(error);
        return { state: 'auth error', error: 'Error en el servidor' };
    }
  }
};
