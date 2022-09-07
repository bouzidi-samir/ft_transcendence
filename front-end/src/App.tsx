import Authentification from './Containers/Authentification';
import Accueil from "./Containers/Accueil"
import Home from './Containers/Home';
import { BrowserRouter as Router} from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Route, Routes, useParams } from 'react-router';
import { SessionProvider } from 'next-auth/react'
import { getSession, signIn, useSession } from 'next-auth/react'
import UserContext from './Context/userContext';

function App() {
  const [user, setUser] = useState({}); 
  
  return (  
    <Router>
      <UserContext.Provider value={{user, setUser}}> 
      <Routes>
        <Route path="/" element={<Authentification/>} />
        <Route path="/Accueil" element={<Accueil/>} /> 
        <Route path="/Home" element={<Home/>} /> 
      </Routes>
      </UserContext.Provider> 
    </Router>
  
  );
}

export default App;
