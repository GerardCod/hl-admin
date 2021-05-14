import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import React from 'react';

import VideoProvider from './contexts/VideoContext';
import VideosContainer from './containers/VideosContainer';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/forgot_password" component={ForgotPasswordPage} />
        <VideoProvider>
          <Route path="/videos" component={VideosContainer} />
        </VideoProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
