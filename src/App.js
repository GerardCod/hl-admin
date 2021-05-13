import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import VideosPage from './pages/VideosPage';
import React from 'react';
import UploadVideoPage from './pages/UploadVideoPage';
import VideoProvider from './contexts/VideoContext';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/forgot_password" component={ForgotPasswordPage} />
        <VideoProvider>
          <Route path="/videos" component={VideosPage} />
          <Route path="/uploadVideos" component={UploadVideoPage} />
        </VideoProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
