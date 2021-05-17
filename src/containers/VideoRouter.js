import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import EditVideoPage from '../pages/EditVideoPage';
import VideoDetailsPage from '../pages/VideoDetailsPage';

const VideoRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact component={VideoDetailsPage} />
      <Route path={`${path}/edit`} component={EditVideoPage} />
    </Switch>
  );
}

export default VideoRouter;