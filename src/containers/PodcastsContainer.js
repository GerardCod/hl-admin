import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import PodcastsPage from '../pages/PodcastsPage';
import UploadPodcastPage from '../pages/UploadPodcastPage';

const PodcastsContainer = () => {
  let { path } = useRouteMatch("/admin/podcasts");

  console.log(path);
  return (
    <Switch>
      <Route path={path} exact component={PodcastsPage} />
      <Route path={`${path}/upload`} component={UploadPodcastPage} />
    </Switch>
  );
}

export default PodcastsContainer;