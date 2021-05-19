import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import React from 'react';
import Admin from './containers/Admin';
import NotFoundPage from './pages/NotFoundPage';

//Providers
import VideoProvider from './contexts/VideoContext';
import PodcastProvider from './contexts/PodcastContext';

//Containers
import VideosContainer from './containers/VideosContainer';
import PodcastsContainer from './containers/PodcastsContainer';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/forgot_password" component={ForgotPasswordPage} />
        <Route path="/admin">
          <Admin>
              <VideoProvider>
                <Route path="/admin/videos" component={VideosContainer} />
              </VideoProvider>
              <PodcastProvider>
                <Route path="/admin/podcasts" component={PodcastsContainer} />
              </PodcastProvider>
          </Admin>
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
