import Authentification from './Containers/Authentification';
import Home from './Containers/Home';
import Chat from './Containers/Chat';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes} from 'react-router';
import ProfilSettings from './Containers/ProfilSettings';
import UserProfil from './Components/Share/UserProfil';
import LoadingPage from './Components/LoadingPage';
import Unauthorized from './Components/Share/Unauthorized';
import NotFound from './Components/Share/NotFound';
import CodePage from './Components/Qrcode';

function App() {

  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Authentification/>} />
        <Route path="/Home" element={<Home/>}/> 
        <Route path="/ProfilSettings" element={<ProfilSettings/>}/>
        <Route path="/UserProfil/:id" element={<UserProfil/>}/>
        <Route path="/Chat" element={<Chat/>}/> 
        <Route path="/Loading" element={<LoadingPage/>}/>
        <Route path="/qrcode" element={<CodePage/>}/> 
        <Route path="/Unauthorized" element={<Unauthorized/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>  
  );
}

export default App;
