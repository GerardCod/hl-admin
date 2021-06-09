import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({children}) => {
  const {state} = useContext(AuthContext);

  return (
    <>
      {
        state.user ?
          {children} :
        <Redirect to="/" />
      }
    </>
  );
}

export default ProtectedRoute;