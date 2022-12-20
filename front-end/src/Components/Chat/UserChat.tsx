import '../../styles/Components/Chat/UserChat.css'
import { useState, useEffect, useContext } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import PrivateMessage from './PrivateMessage';
import GameLauncher from './GameLauncher';
import MuteUser from './MuteUser';
import BanUser from './BanUser';
import NewMember from './NewMember';
import Invitation from '../Home/Invitation';
import InvitationGame from '../Home/InvitationGame';
import { io, Socket } from "socket.io-client";
import { SocketContext } from '../../Context/socket';

export default function UserChat() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const [members, setMembers] = useState([]);
    const socket = useContext(SocketContext);
  
    // useEffect(() => {
    //     const newSocket = io(`http://${hostname}:8000`);
    //     setSocket(newSocket)
    // }, [setSocket])
  
    const memberListener = (alert: string) => {
    }
    
    useEffect(() => {
        socket?.on("newMemberServer", memberListener);
        return () => {socket?.off("newMemberServer", memberListener)}
    }, [memberListener])
   
    useEffect( () => {    
        let url : string = `http://${hostname}:4000/chat/getRoomMembers/${RoomActive.tag}`;
        fetch(url, {headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          }})
        .then(response => response.json())
        .then(data => setMembers(data));
    }, [RoomActive, memberListener]
    )

    return (
        <div className="userchat-content">
              <h2>Membres</h2>
              {RoomActive.privateMessage === false && RoomActive.tag !== "global" ? 
              <NewMember members={members} setMembers={setMembers}/> : null}
              <div className='online-list'>
                  {
                      members.map((user : any) => (
                        user.username !== User.username ? 
                        <div key={user.id + user.username} className='user-block'>
                                <p>{user.nickname}</p>
                        <div className="user-online">
                                    <img src={user.avatar_url} className="online-avatar"></img>
                                <Link  to={"/UserProfil/" + user.username} state={{toBlock: {user}}} className='user-icon-profil'style={{textDecoration: 'none'}}>
                                </Link>
                                    <PrivateMessage interlocutor={user}/> 
                                    <GameLauncher  player2={user} />
                                    <MuteUser toMute={user}/>
                                    <BanUser toBan={user}/>
                            </div>
                            </div>
                            : null
                            )
                      )
                  }
                </div>  
                <div>
                  <Invitation/>
                  <InvitationGame/>
                </div>      
        </div>
    );
}