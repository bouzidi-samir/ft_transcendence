import '../../styles/Components/Chat/NewMember.css'
import { useContext, useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import Alert from '../Share/Alert';
import { io, Socket } from 'socket.io-client';
import { SocketContext } from '../../Context/socket';

export default function NewMember(props : any) {
    const {hostname} = document.location;
    const[isAdmin, setIsAdmin] = useState(false);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const User = useSelector((state: any) => state.User);
    const [userlist, setUserlist] = useState<any>([])
    const [adminList, setAdminList] = useState<any>([])
    const [statu, setStatu] = useState(""); 
    const [alert, setAlert] = useState(false);
    const alertAdmin = "NEW ROOM ADMiN !!!";
    const alertRoomInvitation = {text: "room invitation"};

    const socket = useContext(SocketContext);

    async function updateMemberList() {
        let url : string = `http://${hostname}:4000/chat/getRoomMembers/${RoomActive.tag}`;
        fetch(url, {headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          }})
        .then(response => response.json())
        .then(data => props.setMembers(data));
    }

    // useEffect(() => {
    //     const newSocket = io(`http://${hostname}:8000`);
    //     setSocket(newSocket)
    // }, [setSocket])

    const adminListener = (alertRoom: string) => {
        updateMemberList();
    }

    useEffect(() => {
        socket?.on("newAdminServer", adminListener);
        return () => {
            socket?.off("newAdminServer", adminListener)
        }
    }, [adminListener])
    
    useEffect(() => {
        let url = `http://${hostname}:4000/users`;
        fetch(url, {headers: 
            {'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          },}
    ).then(ret => ret.json()).then(ret => setUserlist(ret))
    }, []
    )

    useEffect(() => {
        let url = `http://${hostname}:4000/chat/getRoomAdmin/${RoomActive.tag}`;
        fetch(url, { headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            "Content-Type": "application/json",
            'cors': 'true'
        },})
        .then(ret => ret.json()).then(ret => setAdminList(ret))
    }, [RoomActive]
    )
    
    function addMember() : any {
       
        if (!adminList.some((e : any) => e.nickname === User.nickname )) {
            setAlert(true);
            return ;
        }
        setIsAdmin(true)
    }

    async function sendInvitation(toUser : any) {
        let url = `http://${hostname}:4000/chat/roomInvitation`;
        const response = await fetch(url, {method: "POST",
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            tag : RoomActive.tag,
            senderName: User.username,
            receiverName: toUser.username
        })
    }
    )
    socket?.emit("roomInvitation", alertRoomInvitation);
        // setStatu("Inviation envoiyée!");
        // setTimeout(() => {
        //     setStatu("");
        // }, 1000);
    }

    async function setAdmin(toUser : any) {
        let url = `http://${hostname}:4000/chat/adminizer`;
        const response =   fetch(url, {method: "POST",
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username: User.username,
            tag: RoomActive.tag,
            targetName: toUser.username
        })
    }
    )
        setStatu(`${toUser.nickname} est désormais admin de ce salon`);
        setTimeout(() => {
            setStatu("");
        }, 1000);
        socket?.emit("newAdmin", alertAdmin);
    }


    return (
        <>
           <button onClick={addMember} className="btn btn-primary add" >+</button>
            {
                
                isAdmin ? 
                <>
                <div className='fond1'></div>
                <div className='addMember'  data-aos="fade-up" data-aos-duration="1000">
                        <div onClick={()=>setIsAdmin(false)} className="cross-member"></div>
                        <h2>Gestionnaire des membres:</h2>
                        <div className='membertoadd'>
                         
                            {
                                userlist.map((user : any) => (
                                    <div key={user.nickname} className='membertoadd-case'>
                                       <img src={user.avatar_url} className='membertoadd-avatar'></img>
                                       <h2>{user.nickname}</h2>
                                       <button onClick={() => sendInvitation(user)} className='btn btn-primary'>+Membre</button>
                                       <button onClick={() => setAdmin(user)} className='btn btn-primary'>+Admin</button>
                                    </div>
                                ))  
                            }               
                        </div>
                            <p>{statu}</p>
                    </div>
                </>
                : null
            }
            {alert ? <Alert message="Cet action est réservée aux admins du channel." setWindow={setAlert} /> : null}
        </>
    )

}