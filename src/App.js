import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import VideosPage from './pages/VideosPage';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={LoginPage} />
      <Route path="/forgot_password" component={ForgotPasswordPage} />
      <Route path="/videos" component={VideosPage} />
    </BrowserRouter>
  );
}

export default App;
