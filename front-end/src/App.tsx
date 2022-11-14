import Authentification from './Containers/Authentification';
import Accueil from "./Containers/Accueil"
import Home from './Containers/Home';
import Chat from './Containers/Chat';
import Game from './Containers/Game';
import Game2 from './Containers/Game2';
import { BrowserRouter as Router} from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Route, Routes, useParams } from 'react-router';
import { SessionProvider } from 'next-auth/react'
import { getSession, signIn, useSession } from 'next-auth/react'
import Particle from './Components/Particle';
import ProfilSettings from './Containers/ProfilSettings';
import UserProfil from './Components/Share/UserProfil';
import LoadingPage from './Components/LoadingPage';
import MatchingPage from './Components/MatchingPage';
import CodePage from './Components/Qrcode';
import WaitingRoom from './Components/WaitingRoom';

function App() {

  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Authentification/>} />
        <Route path="/Accueil" element={<Accueil/>} /> 
        <Route path="/Home" element={<Home/>}/> 
        <Route path="/ProfilSettings" element={<ProfilSettings/>}/>
        <Route path="/UserProfil/:id" element={<UserProfil/>}/>
        <Route path="/Chat" element={<Chat/>}/>
        <Route path="/qrcode" element={<CodePage/>}/> 
		<Route path="/Game" element={<Game/>}/>
		<Route path="/Game2" element={<Game2/>}/>
        <Route path="/Loading" element={<LoadingPage/>}/>
        <Route path="/Matching" element={<MatchingPage/>}/>
        <Route path="/WaitingRoom" element={<WaitingRoom/>}/>
      </Routes>
    </Router>  
  );
}

export default App;
