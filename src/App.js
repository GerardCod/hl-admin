import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={LoginPage} />
    </BrowserRouter>
  );
}

export default App;
