import React from 'react';
import { Route, Switch } from 'react-router';
import Admin from './Admin';

const PodcastsContainer = () => {
  return (
    <Admin>
      <Switch>
        <Route path="/" exact />
      </Switch>
    </Admin>
  );
}

export default PodcastsContainer;