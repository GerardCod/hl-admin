import React from 'react';
import { Route, useRouteMatch } from 'react-router';
import AssessmentDetails from '../pages/AssessmentDetails';
import AssessmentPage from '../pages/AssessmentsPage';
import CreateAssessmentPage from '../pages/CreateAssessmentPage';
import { Switch } from 'react-router-dom';
import CreateAssessmentProvider from '../contexts/CreateAssessmentContext';

const AssessmentContainer = () => {
  const { path } = useRouteMatch('/admin/assessments');

  return (
    <Switch>
      <Route path={path} exact component={AssessmentPage} />
      <CreateAssessmentProvider>
        <Route path={`${path}/create`} component={CreateAssessmentPage} />
        <Route path={`${path}/details/:id`} component={AssessmentDetails} />
      </CreateAssessmentProvider>
    </Switch>
  );
}

export default AssessmentContainer;