import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import React from 'react';
import NotFoundPage from './pages/NotFoundPage';
import AdminRouter from './containers/AdminRouter';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/forgot_password" component={ForgotPasswordPage} />
        <Route path="/admin" component={AdminRouter} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
