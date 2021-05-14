import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import UploadVideoPage from '../pages/UploadVideoPage';
import VideosPage from '../pages/VideosPage';
import Admin from './Admin';
import VideoDetailsPage from '../pages/VideoDetailsPage';

const VideosContainer = () => {
  let { path } = useRouteMatch();

  return (
    <Admin>
      <Switch>
        <Route path={path} exact component={VideosPage} />
        <Route path={`${path}/upload`} component={UploadVideoPage} />
        <Route path={`${path}/:id`} component={VideoDetailsPage} />
      </Switch>
    </Admin>
  );
}

export default VideosContainer;