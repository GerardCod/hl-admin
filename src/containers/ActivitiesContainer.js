import React, { Fragment } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import ActivitiesPage from '../pages/ActivitiesPage';
import CreateActivityPage from '../pages/CreateActivityPage';
import ActivityRouter from './ActivityRouter';
import MaterialProvider from '../contexts/MaterialContext';

const ActivitiesContainer = () => {
  let { path } = useRouteMatch("/admin/activities");

  return (
    <Fragment>
      <Route exact path={path} component={ActivitiesPage} />
      <MaterialProvider>
        <Route path={`${path}/create`} exact component={CreateActivityPage} />
        <Route path={`${path}/details/:id`} component={ActivityRouter} />
      </MaterialProvider>
    </Fragment>
  );
}

export default ActivitiesContainer;