import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect, useContext } from 'react';
import { set } from 'immer/dist/internal';
import { SocketContext } from '../../Context/socket';

export default function PrivateMessage(props: any) {
    const {hostname} = document.location;
    const dispatch = useDispatch();
    const {interlocutor} = props;
    const [increment, setIncrement] = useState(0);
    const User = useSelector((state: any) => state.User);
    let Roomlist = useSelector((state: any) => state.RoomList);
    const [blockedList, setBlockedList] = useState([]);
    const [update, setUpdate] = useState(0);
    const socket = useContext(SocketContext);
    const alertRoom = "NEW ROOM AVAILABLE !!!";

    useEffect(() => {
        let url = `http://${hostname}:4000/users/blockedPeople/${interlocutor.username}`;
        fetch(url, {headers: 
            {'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          },})
        .then(ret => ret.json()).then((ret) => {
            //let list : any  = ret.map((e: any) => (User.username));
            setBlockedList(ret)
        }
        )
    }
    , [update]
    )
    
    async function updateBlockedList(){
        let url = `http://${hostname}:4000/users/blockedPeople/${interlocutor.username}`;
        let rep = await fetch(url, {headers: 
            {'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          },})
        let list = await rep.json(); 
        setBlockedList(list);
        return (list);
    }


   
    async function openConversation(e : any) {
        e.preventDefault();
        let list = await updateBlockedList();
        let check = Roomlist.filter((e: any) => 
                e.tag === User.nickname + interlocutor.nickname || e.tag === interlocutor.nickname + User.nickname
            )
        if (list.some((e : any) => e.toUsername == User.username)){
            alert("Cet utilisateur vous a bloqué")
            return;
        }
       if (check.length > 0){
           dispatch({type: "RoomActive/setRoomActive",payload: check[0]});
            return;
        }
        let newRoom : any = {
            username: User.username,
            nickname: User.nickname,
            tag: User.nickname + interlocutor.nickname,
            public: false,
            private: true,
            privateMessage: true,
            password: ""
        }
        let url = `http://${hostname}:4000/chat/createRoom`
        let response = fetch(url, {method : 'POST',
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom)
    }).then(ret => ret.json())
        dispatch({type: "Roomlist/addRoom", payload: newRoom,});
        socket?.emit("newRoomClient", alertRoom);
    }

    return (
        <div onClick={openConversation} className='user-icon-mess'></div> 
    )

}