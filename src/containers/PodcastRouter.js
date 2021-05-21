import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import PodcastDetailsPage from '../components/PodcastDetailsPage';
import EditPodcastPage from '../pages/EditPodcastPage';

const PodcastRouter = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact component={ PodcastDetailsPage } />
      <Route  path={`${path}/edit`} component={ EditPodcastPage } />
    </Switch>
  )
};

export default PodcastRouter;