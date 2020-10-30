import { auth } from './app';

export const signInWithCredentials = async (
  username: string,
  password: string,
): Promise<SuccessMessage | { error: string }> => {
  const email = username.includes('@') ? username : `${username}@example.com`;
  try {
    const userCred = await auth.signInWithEmailAndPassword(email, password);
    const token = await userCred.user?.getIdTokenResult();
    if (token?.claims.admin) return { success: true, url: '/menu' };
    return { success: true, url: `/residents/${userCred.user?.uid}` };
  } catch (error) {
    const authMethod = username.includes('@')
      ? 'correo electrónico'
      : 'teléfono';
    switch (error.code) {
      case 'auth/invalid-email':
        return { error: 'Usuario no válido' };
      case 'auth/user-disabled':
        return { error: 'Usuario deshabilitado' };
      case 'auth/user-not-found':
        return {
          error: `No existe un usuario con ese ${authMethod}`,
        };
      case 'auth/wrong-password':
        return { error: 'Contraseña incorrecta' };
      default:
        console.error(error);
        return { error: 'Error en el servidor' };
    }
  }
};
