import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ActivitiesPage from '../pages/ActivitiesPage';
import CreateActivityPage from '../pages/CreateActivityPage';
import ActivityRouter from './ActivityRouter';
import MaterialProvider from '../contexts/MaterialContext';

const ActivitiesContainer = () => {
  let { path } = useRouteMatch("/admin/activities");

  return (
    <Switch>
      <Route exact path={path} component={ActivitiesPage} />
      <MaterialProvider>
        <Route path={`${path}/create`} component={CreateActivityPage} />
      </MaterialProvider>
      <Route path={`${path}/:id`} component={ActivityRouter} />
    </Switch>
  );
}

export default ActivitiesContainer;