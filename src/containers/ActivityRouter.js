import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router';
import { Route } from 'react-router-dom';
import ActivityDetailsPage from '../pages/ActivityDetailsPage';
import EditActivityPage from '../pages/EditActivityPage';

const ActivityRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Fragment>
      <Route path={`${path}`} exact component={ActivityDetailsPage} />
      <Route path={`${path}/edit`} component={EditActivityPage} />
    </Fragment>
  );
}

export default ActivityRouter;