import Authentification from './Containers/Authentification';
import Home from './Containers/Home';
import Chat from './Containers/Chat';
import Game from './Containers/Game';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes} from 'react-router';
import ProfilSettings from './Containers/ProfilSettings';
import UserProfil from './Components/Share/UserProfil';
import LoadingPage from './Components/LoadingPage';
import Unauthorized from './Components/Share/Unauthorized';
import NotFound from './Components/Share/NotFound';
import MatchingPage from './Components/MatchingPage';
import CodePage from './Components/Qrcode';
import WaitingRoom from './Components/WaitingRoom';

function App() {

  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Authentification/>} />
        <Route path="/Home" element={<Home/>}/> 
        <Route path="/ProfilSettings" element={<ProfilSettings/>}/>
        <Route path="/UserProfil/:id" element={<UserProfil/>}/>
        <Route path="/Loading" element={<LoadingPage/>}/>
        <Route path="/Unauthorized" element={<Unauthorized/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/Chat" element={<Chat/>}/>
        <Route path="/qrcode" element={<CodePage/>}/> 
		<Route path="/Game" element={<Game/>}/>
        <Route path="/Loading" element={<LoadingPage/>}/>
        <Route path="/Matching" element={<MatchingPage/>}/>
        <Route path="/WaitingRoom" element={<WaitingRoom/>}/>
      </Routes>
    </Router>  
  );
}

export default App;
