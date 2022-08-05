import './App.css';
import Authentification from './Containers/Authentification/Authentification';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes, useParams } from 'react-router';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Authentification/>} />
        

      </Routes>
    </Router>
  );
}

export default App;
