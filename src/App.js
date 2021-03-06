import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminRouter from './containers/AdminRouter';
import AuthProvider from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginRouter from './containers/LoginRouter';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginRouter} />
          <Route path="/forgot_password" component={ForgotPasswordPage} />
          <Route path="/change_password" component={ChangePasswordPage} />
          <Route path="/admin" component={AdminRouter} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
