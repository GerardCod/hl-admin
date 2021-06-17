import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ActivitiesPage from '../pages/ActivitiesPage';

const ActivitiesContainer = () => {
  let { path } = useRouteMatch("/admin/activities");  

  return (
    <Switch>
      <Route exact path={path} component={ActivitiesPage} />
    </Switch>
  );
}

export default ActivitiesContainer;