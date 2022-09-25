import '../../styles/Components/Chat/UserChat.css'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';


export default function UserChat() {
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const [userlist, setUserlist] : any = useState([{}]);
    
    useEffect(() => {
        let url = "http://localhost:4000/users";
        fetch(url)
        .then (response => response.json())
        .then (data => setUserlist(data))
    }, []) 

    return (
        <div className="userchat-content">
              <h2>En Ligne</h2>
         
              <div className='online-list'>
                  {
                      userlist.map((user : any) => (
                        user.username != User.username ? 
                                <Link to = {"/UserProfil/" + user.id}>
                            <div key={user.id} className="user-online">
                                    <img src={user.avatar_url} className="online-avatar">
                                    </img>
                                <p>{user.nickname}</p>  
                            </div>
                                </Link>  
                            : null
                            )
                      )
                  }
              </div>
        </div>
    );
}