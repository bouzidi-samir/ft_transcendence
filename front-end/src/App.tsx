import Authentification from './Containers/Authentification';
import Accueil from "./Containers/Accueil"
import Home from './Containers/Home';
import { BrowserRouter as Router} from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Route, Routes, useParams } from 'react-router';
import { SessionProvider } from 'next-auth/react'
import { getSession, signIn, useSession } from 'next-auth/react'
import UserContext from './Context/userProfilContext';

function App() {
  const [user, setUser] = useState(null); 
  const value = useMemo(() => ({user, setUser}), [user, setUser]);

  return (  
    <Router>
      <Routes>
      <Route path="/" element={<Authentification/>} />
  
        <Route path="/Accueil/:username" element={<Accueil/>} /> 
        <Route path="/Home" element={<Home/>} /> 
    
      </Routes>
    </Router>
  
  );
}

export default App;
