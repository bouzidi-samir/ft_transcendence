import '../styles/Components/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="Navbar">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light ">    
                    <a href="#" className="navbar-brand">
                    </a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse"
                    data-bs-target="#toggleMobileMenu"
                    aria-controls="toggleMobileMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="toggleMobileMenu">
                
                    <ul className="navbar-nav ms-auto text-center"> 
                        
                        <li>   
                        <Link className="nav_link" to="/">
                            <div 
                            className='profil-icon'></div>
                        </Link>
                        </li> 
                        <li>   
                        <Link className="nav_link" to="/">
                            <div className='chat-icon'></div>
                        </Link>
                        </li>  
                        <li>   
                        <Link className="nav_link" to="/">
                            <div className='game-icon'></div>
                        </Link>
                        </li>
                        <li>   
                        <Link className="nav_link" to="/">
                            <div className='logout-icon'></div>
                        </Link>
                        </li>
                    </ul>
                   
                
                </div>
                 
                </nav>
            </div>
        </div>
    );
}

export default Navbar;