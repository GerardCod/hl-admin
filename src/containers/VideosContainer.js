import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import UploadVideoPage from '../pages/UploadVideoPage';
import VideosPage from '../pages/VideosPage';
import VideoRouter from './VideoRouter';

const VideosContainer = () => {
  let { path } = useRouteMatch("/admin/videos");

  return (
    <Switch>
      <Route path={path} exact component={VideosPage} />
      <Route path={`${path}/upload`} component={UploadVideoPage} />
      <Route path={`${path}/:id`} component={VideoRouter} />
    </Switch>
  );
}

export default VideosContainer;