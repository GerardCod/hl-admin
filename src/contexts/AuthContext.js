import React, { createContext, useCallback, useReducer, useRef } from "react";
import AuthReducer, { initialState } from "../reducers/AuthReducer";
import { ERROR, LOADING, PASSWORD_CHANGED, RESET_STATUS, RESPONSE_SUCCESS, SIGN_OUT, USER_FOUND } from '../reducers/Actions';
import { auth, batch, firestore } from "../services/Firebase";
import { collectIdAndData } from "../utils";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const userListenerRef = useRef({});
  
  const searchUser = useCallback(async ({email, role}) => {
    try {
      const userCollection = await firestore.collection('accounts').where('email', '==', email).where('role.name', '==', role).get();
      
      if (userCollection.empty) {
        throw new Error('No hay un usuario con ese email y rol');
      }
      
      const user = collectIdAndData(userCollection.docs[0]);
      return user;
    } catch (error) {
      return error.message;
    }
  }, []);

  const signin = useCallback(async ({email, password, role}, {onError}) => {
    dispatch({type: LOADING});
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const userData = await searchUser({email, role});

      if (typeof userData === 'string') {
        throw new Error(userData);
      }

      localStorage.setItem('user', JSON.stringify(userData));
      dispatch({type: USER_FOUND, payload: userData});
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, [searchUser]);

  const signOut = useCallback(() => {
    auth.signOut();
    dispatch({type: SIGN_OUT});
  }, []);

  const forgotPassword = useCallback(async (data, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await auth.sendPasswordResetEmail(data.email);
      dispatch({type: RESPONSE_SUCCESS});
      onSuccess(`Un correo ha sido enviado a la dirección ${data.email}`);
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const changePassword = useCallback(async (code, {password, email}, {onSuccess, onError}) => {
    dispatch({type: LOADING});
    try {
      await auth.confirmPasswordReset(code, password);
      const users = await firestore.collection('accounts').where('email', '==', email).get();
      users.forEach(doc => {
        batch.update(doc.ref, {password});
      })
      await batch.commit();
      dispatch({type: PASSWORD_CHANGED});
      onSuccess('La contraseña fue cambiada exitosamente');
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const fetchUserData = useCallback(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch({type: USER_FOUND, payload: user});
    return user;
  }, []);

  const verifyEmailCode = useCallback(async (code, {onError}) => {
    dispatch({type: LOADING});
    try {
      console.log('Executing reset password code verification');
      const response = await auth.verifyPasswordResetCode(code);
      const unvalid = isUnvalid(response);
      if (unvalid) {
        dispatch({type: RESET_STATUS, payload: unvalid});
        throw new Error(unvalid);
      }
      dispatch({type: RESPONSE_SUCCESS});
    } catch (error) {
      dispatch({type: ERROR, payload: error.message});
      onError(error.message);
    }
  }, []);

  const isUnvalid = (responseCode) => {
    const map = {
      'auth/expired-action-code': 'El código ya expiró',
      'auth/invalid-action-code': 'El código es inválido',
      'auth/user-disabled': 'Tu cuenta está inhabilitada',
      'auth/user-not-found': 'El usuario no existe'
    }
    return map[responseCode] || null;
  }

  const childProps = {state, signin, signOut, forgotPassword, fetchUserData, userListenerRef, verifyEmailCode, changePassword};

  return (
    <AuthContext.Provider value={childProps}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;
