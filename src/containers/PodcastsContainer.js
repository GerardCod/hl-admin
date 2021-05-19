import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import PodcastsPage from '../pages/PodcastsPage';

const PodcastsContainer = () => {
  let { path } = useRouteMatch("/admin/podcasts");

  console.log(path);
  return (
    <Switch>
      <Route path={path} exact component={PodcastsPage} />
    </Switch>
  );
}

export default PodcastsContainer;