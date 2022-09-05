import '../styles/Components/Users.css'
import { useState, useEffect } from 'react';

export default function Users() {

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
                    userlist.map((user : any)=> (
                        
                            <img key={user.id} className='user-avatar' src={user.avatar_url}></img>
                        
                    )
                    )
                }
            </div>  
        </div>

    );
}