import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'workbox-routing';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({path, component}) => {
  const {state} = useContext(AuthContext);

  return (
    <>
      {
        state.user ?
          <Route path={path} component={component} /> :
        <Redirect to="/" />
      }
    </>
  );
}

export default ProtectedRoute;