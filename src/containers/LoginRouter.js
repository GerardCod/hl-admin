import React, {Fragment} from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import LoginPage from '../pages/LoginPage';

export default function LoginRouter() {
  const { path } = useRouteMatch('/login');
  
  return (
    <Fragment>
      <Route path={path} exact component={SignInPage} />
      <Route path={`${route}/:role`} component={LoginPage} />
    </Fragment>
  )
}