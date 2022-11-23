import '../../styles/Components/Chat/UserChat.css'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import PrivateMessage from './PrivateMessage';
import MuteUser from './MuteUser';
import BanUser from './BanUser';
import Notifs from '../Home/Notifs';
import Invitation from '../Home/Invitation';
import ChatNotifs from './ChatNotifs';
import InvitationGame from '../Home/InvitationGame';
import GameLauncher from './GameLauncher';


export default function UserChat() {
    const User = useSelector((state: any) => state.User);
    const Userlist = useSelector((state: any) => state.UserList);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const dispatch = useDispatch();
    const [members, setMembers] = useState([]);
   
    useEffect( () => {    
        let url : string = `http://localhost:4000/chat/getRoomMembers/${RoomActive.tag}`;
        fetch(url)
        .then(response => response.json())
        .then(data => setMembers(data));
    }, []
    )

    return (
        <div className="userchat-content">
              <h2>En Ligne</h2>
         
              <div className='online-list'>
                  {
                      members.map((user : any) => (
                      //  user.username != User.username ? 
                        <div className='user-block'>
                                <p>{user.nickname}</p>
                        <div key={user.id} className="user-online">
                                    <img src={user.avatar_url} className="online-avatar"></img>
                                <Link  to={"/UserProfil/" + user.userId} state={{toBlock: {user}}} className='user-icon-profil'style={{textDecoration: 'none'}}>
                                </Link>
                                    <PrivateMessage interlocutor={user}/> 
                                    <GameLauncher player2={user}/>
                                    <MuteUser toMute={user}/>
                                    <BanUser toBan={user}/>
                            </div>
                            </div>
                        //    : null
                            )
                      )
                  }
            </div>
              <div className='online-notifs-title ' >
                    <h2>Messagerie</h2>
              </div>
              <div>
                <ChatNotifs/>
                <Invitation/>
                <InvitationGame/>
              </div>
        </div>
    );
}