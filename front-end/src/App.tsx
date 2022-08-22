import Authentification from './Containers/Authentification';
import Accueil from "./Containers/Accueil"
import Home from './Containers/Home';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes, useParams } from 'react-router';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Authentification/>} />
      <Route path="/Accueil" element={<Accueil/>} /> 
      <Route path="/Home" element={<Home/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
