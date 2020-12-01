import { auth } from './app';

export const signInWithCredentials = async (
  username: string,
  password: string,
  setUserAcc: React.Dispatch<React.SetStateAction<UserAcc | undefined>>,
): Promise<SuccessAndURL | AuthenticationError> => {
  const email = username.includes('@') ? username : `${username}@example.com`;
  try {
    const userCred = await auth.signInWithEmailAndPassword(email, password);
    if (userCred.user !== null) {
      const token = await userCred.user?.getIdTokenResult();
      setUserAcc({
        uid: userCred.user.uid,
        claims: token.claims,
      });
      if (token.claims.admin) return { state: 'success', url: '/menu' };
      return { state: 'success', url: '/residents' };
    }
    return { state: 'auth error', error: 'Error en el servidor' };
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

export const signOut = () => auth.signOut();

export const updatePassword = async (
  newPassword: string,
): Promise<SuccessState | ValidationErrorsState | FirebaseErrorState> => {
  try {
    if (auth.currentUser === null)
      throw new Error('No hay usuario autenticado');
    await auth.currentUser.updatePassword(newPassword);
    return { state: 'success' };
  } catch (error) {
    if (error.code === 'auth/weak-password') {
      return {
        state: 'validation errors',
        errors: [
          'Tu nueva contraseña es demasiado débil, añade por lo menos 6 caracteres',
        ],
      };
    }
    return {
      state: 'validation errors',
      errors: ['Intenta inciar sesión de nuevo'],
    };
  }
};

export const isLoggedIn = (userAcc: UserAcc | undefined): boolean =>
  typeof userAcc !== 'undefined';

export const isAdmin = (userAcc: UserAcc | undefined): boolean =>
  !!userAcc?.claims.admin;

export const isPsyOrAdmin = (userAcc: UserAcc | undefined): boolean =>
  !!userAcc?.claims.admin || !!userAcc?.claims.psy;
