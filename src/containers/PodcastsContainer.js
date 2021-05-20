import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import PodcastDetailsPage from '../components/PodcastDetailsPage';
import PodcastsPage from '../pages/PodcastsPage';
import UploadPodcastPage from '../pages/UploadPodcastPage';

const PodcastsContainer = () => {
  let { path } = useRouteMatch("/admin/podcasts");

  return (
    <Switch>
      <Route path={path} exact component={PodcastsPage} />
      <Route path={`${path}/upload`} component={UploadPodcastPage} />
      <Route path={`${path}/:id`} component={PodcastDetailsPage} />
    </Switch>
  );
}

export default PodcastsContainer;