import Authentification from './Containers/Authentification';
import Accueil from "./Containers/Accueil"
import Home from './Containers/Home';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes, useParams } from 'react-router';
import { SessionProvider } from 'next-auth/react'
import { getSession, signIn, useSession } from 'next-auth/react'

function App() {
  var session : any;
  return (
    <SessionProvider session={session}>
    <Router>
      <Routes>
      <Route path="/" element={<Authentification/>} />
      <Route path="/Accueil" element={<Accueil/>} /> 
      <Route path="/Home" element={<Home/>} /> 
      </Routes>
    </Router>
    </SessionProvider>
  );
}

export default App;
