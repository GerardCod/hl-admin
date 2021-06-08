import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import React from 'react';
import NotFoundPage from './pages/NotFoundPage';
import AdminRouter from './containers/AdminRouter';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/forgot_password" component={ForgotPasswordPage} />
          <ProtectedRoute>
            <Route path="/admin" component={AdminRouter} />
          </ProtectedRoute>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
