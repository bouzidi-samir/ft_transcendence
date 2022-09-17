import Authentification from './Containers/Authentification';
import Accueil from "./Containers/Accueil"
import Home from './Containers/Home';
import Profil from './Containers/Profil';
import { BrowserRouter as Router} from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Route, Routes, useParams } from 'react-router';
import { SessionProvider } from 'next-auth/react'
import { getSession, signIn, useSession } from 'next-auth/react'
import UserContext from './Context/userContext';
import Particle from './Components/Particle';
import ProfilSettings from './Containers/ProfilSettings';

function App() {
  const [user, setUser] = useState({}); 
  
  return (  
      <UserContext.Provider value={{user, setUser}}> 
    <Router>
      <Routes>
        <Route path="/" element={<Authentification/>} />
        <Route path="/Accueil" element={<Accueil/>} /> 
        <Route path="/Home" element={<Home/>}/> 
        <Route path="/Profil" element={<Profil/>}/>
        <Route path="/ProfilSettings" element={<ProfilSettings/>}/>
      </Routes>
    </Router>
      </UserContext.Provider> 
  
  );
}

export default App;
