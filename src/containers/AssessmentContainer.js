import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import CreateAssessmentProvider from '../contexts/CreateAssessmentContext';
import AssessmentPage from '../pages/AssessmentsPage';
import CreateAssessmentPage from '../pages/CreateAssessmentPage';

const AssessmentContainer = () => {
  const { path } = useRouteMatch('/admin/assessments');

  return (
    <Switch>
      <Route path={path} exact component={AssessmentPage} />
      <CreateAssessmentProvider>
        <Route path={`${path}/create`} component={CreateAssessmentPage} />
      </CreateAssessmentProvider>
    </Switch>
  );
}

export default AssessmentContainer;