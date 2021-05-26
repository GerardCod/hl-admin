import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AccountDetailsPage from '../pages/AccountDetailsPage';
import EditAccountPage from '../pages/EditAccountPage';

const AccountRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact component={AccountDetailsPage} />
      <Route path={`${path}/edit`} component={EditAccountPage} />
    </Switch>
  );
}

export default AccountRouter;