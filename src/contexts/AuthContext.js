import React, { createContext, useReducer } from "react";
import AuthReducer, { initialState } from "../reducers/AuthReducer";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const childProps = {state};

  return (
    <AuthContext.Provider value={childProps}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;
