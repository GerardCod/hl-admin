import React from 'react';
import { Route, Switch, useRouteMatch, withRouter } from 'react-router';
import UploadVideoPage from '../pages/UploadVideoPage';
import VideosPage from '../pages/VideosPage';
import Admin from './Admin';
import VideoRouter from './VideoRouter';

const VideosContainer = () => {
  let { path } = useRouteMatch();

  return (
    <Admin>
      <Switch>
        <Route path={path} exact component={withRouter(VideosPage)} />
        <Route path={`${path}/upload`} component={withRouter(UploadVideoPage)} />
        <Route path={`${path}/:id`} component={VideoRouter} />
      </Switch>
    </Admin>
  );
}

export default VideosContainer;