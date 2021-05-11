import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={LoginPage} />
      <Route path="/forgot_password" component={ForgotPasswordPage} />
    </BrowserRouter>
  );
}

export default App;
