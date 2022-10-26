import '../../styles/Components/Chat/UserChat.css'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import PrivateMessage from './PrivateMessage';
import GameInvitation from './GameInvitation';
import MuteUser from './MuteUser';
import BanUser from './BanUser';
import NewMember from './NewMember';

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
                                    <BanUser/>
                            </div>
                            </div>
                        //    : null
                            )
                      )
                  }
              </div>
        </div>
    );
}