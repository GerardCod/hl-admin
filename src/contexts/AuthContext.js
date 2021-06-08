import React, { createContext, useCallback, useReducer } from "react";
import AuthReducer, { initialState } from "../reducers/AuthReducer";
import { ERROR, LOADING, SIGN_OUT, USER_FOUND } from '../reducers/Actions';
import { auth, firestore } from "../services/Firebase";
import { collectIdAndData } from "../utils";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  
  const searchUser = useCallback(async ({email, password}) => {
    try {
      const userCollection = await firestore.collection('accounts').where('email', '==', email).where('password', '==', password).get();
      const user = collectIdAndData(userCollection.docs[0]);
      return user;
    } catch (error) {
      return error
    }
  }, []);

  const signin = useCallback(async ({email, password}, {onError}) => {
    dispatch({type: LOADING});
    try {
      const userData = await searchUser({email, password});
      if (userData) {
        await auth.signInWithEmailAndPassword(email, password);
      }
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

  const childProps = {state, signin, signOut};

  return (
    <AuthContext.Provider value={childProps}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;
