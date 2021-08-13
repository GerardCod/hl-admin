import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AssessmentPage from '../pages/AssessmentsPage';

const AssessmentContainer = () => {
  const { path } = useRouteMatch('/admin/assessments');
  
  return (
    <Switch>
      <Route path={path} component={AssessmentPage} />
    </Switch>
  );
}

export default AssessmentContainer;