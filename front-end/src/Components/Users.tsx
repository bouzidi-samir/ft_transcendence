import '../styles/Components/Users.css'
import { useState, useEffect, useContext } from 'react';
import UserContext from '../Context/userContext';

export default function Users() {

    const {user, setUser} = useContext(UserContext); 
    const [userlist, setUserlist] : any = useState([{}]);

    useEffect(() => {
        let url = "http://localhost:4000/users";
        fetch(url)
        .then (response => response.json())
        .then (data => setUserlist(data))
    }, []) 
    console.log(userlist[0].username);
    
    return (
        <div className='users-content'>
                <p>Hors Ligne</p>
            <div className='online'>   
                {
                    userlist.map((u : any)=> (
                        u.username != user.username ?
                            <img key={u.id} className='user-avatar' src={u.avatar_url}></img>
                        : null
                    )
                    )
                }
            </div>  
        </div>

    );
}