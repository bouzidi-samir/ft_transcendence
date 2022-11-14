import '../../styles/Components/Chat/UserChat.css'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import PrivateMessage from './PrivateMessage';
import GameInvitation from './GameInvitation';
import MuteUser from './MuteUser';
import BanUser from './BanUser';
import NewMember from './NewMember';
import Invitation from '../Home/Invitation';
import ChatNotifs from './ChatNotifs';


export default function UserChat() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const [members, setMembers] = useState([]);
   
    useEffect( () => {    
        let url : string = `http://${hostname}:4000/chat/getRoomMembers/${RoomActive.tag}`;
        fetch(url, {headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          }})
        .then(response => response.json())
        .then(data => setMembers(data));
    }, [RoomActive]
    )

    return (
        <div className="userchat-content">
              <h2>Membres</h2>
              <NewMember/>
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
                                    <GameInvitation/>
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
                   
              </div>
              <div>
                <Invitation/>
              </div>
        </div>
    );
}