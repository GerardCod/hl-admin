import React from 'react';
import { Switch, useRouteMatch } from 'react-router';
import AccountsPage from '../pages/AccountsPage';
import CreateAccountPage from '../pages/CreateAccountPage';
import { Route } from 'react-router-dom';
import AccountRouter from './AccountRouter';

const AccountsContainer = () => {
  const { path } = useRouteMatch("/admin/accounts");

  return (
    <Switch>
      <Route exact path={path} component={AccountsPage} />
      <Route path={`${path}/new`} component={CreateAccountPage} />
      <Route path={`${path}/:id`} component={AccountRouter} />
    </Switch>
  );
}

export default AccountsContainer;