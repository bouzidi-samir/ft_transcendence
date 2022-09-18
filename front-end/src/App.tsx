import Authentification from './Containers/Authentification';
import Accueil from "./Containers/Accueil"
import Home from './Containers/Home';
import Chat from './Containers/Chat';
import { BrowserRouter as Router} from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Route, Routes, useParams } from 'react-router';
import { SessionProvider } from 'next-auth/react'
import { getSession, signIn, useSession } from 'next-auth/react'
import Particle from './Components/Particle';
import ProfilSettings from './Containers/ProfilSettings';

function App() {

  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Authentification/>} />
        <Route path="/Accueil" element={<Accueil/>} /> 
        <Route path="/Home" element={<Home/>}/> 
        <Route path="/ProfilSettings" element={<ProfilSettings/>}/>
        <Route path="/Chat" element={<Chat/>}/> 
      </Routes>
    </Router>  
  );
}

export default App;
