import React from 'react';
import { useRouteMatch } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import ActivityDetailsPage from '../pages/ActivityDetailsPage';
import EditActivityPage from '../pages/EditActivityPage';

const ActivityRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact component={ActivityDetailsPage} />
      <Route path={`${path}/edit`} component={EditActivityPage} />
    </Switch>
  );
}

export default ActivityRouter;