import React, { createContext, useCallback, useReducer, useRef } from "react";
import AuthReducer, { initialState } from "../reducers/AuthReducer";
import { ERROR, LOADING, RESPONSE_SUCCESS, SIGN_OUT, USER_FOUND } from '../reducers/Actions';
import { auth, firestore } from "../services/Firebase";
import { collectIdAndData } from "../utils";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const userListenerRef = useRef({});
  
  const searchUser = useCallback(async ({email, password}) => {
    try {
      const userCollection = await firestore.collection('accounts').where('email', '==', email).where('password', '==', password).get();
      const user = collectIdAndData(userCollection.docs[0]);
      return user;
    } catch (error) {
      return error;
    }
  }, []);

  const signin = useCallback(async ({email, password}, {onError}) => {
    dispatch({type: LOADING});
    try {
      const userData = await searchUser({email, password});
      if (userData) {
        await auth.signInWithEmailAndPassword(email, password);
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

  const fetchUserData = useCallback(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch({type: USER_FOUND, payload: user});
  }, []);

  const childProps = {state, signin, signOut, forgotPassword, fetchUserData, userListenerRef};

  return (
    <AuthContext.Provider value={childProps}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;
