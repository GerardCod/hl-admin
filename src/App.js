import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import VideosPage from './pages/VideosPage';
import React from 'react';
import UploadVideoPage from './pages/UploadVideoPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/forgot_password" component={ForgotPasswordPage} />
        <Route path="/videos" component={VideosPage} />
        <Route path="/uploadVideos" component={UploadVideoPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
