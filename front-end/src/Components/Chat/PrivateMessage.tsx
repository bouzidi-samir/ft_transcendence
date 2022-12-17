import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';

export default function PrivateMessage(props: any) {
    const {hostname} = document.location;
    const dispatch = useDispatch();
    const {interlocutor} = props;
    const User = useSelector((state: any) => state.User);
    let Roomlist = useSelector((state: any) => state.RoomList);
    const [blockedList, setBlockedList] = useState([]);

    useEffect(() => {
        let url = `http://${hostname}:4000/users/blockedPeople/${interlocutor.username}`;
        fetch(url, {headers: 
            {'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          },})
        .then(ret => ret.json()).then((ret) => { 
            let list : any  = ret.map((e: any) => (User.username));
            setBlockedList(list)
        }
        )
    }
    , [openConversation]
    )
   
    function openConversation(e : any) {
        e.preventDefault();
        let check = Roomlist.filter((e: any) => 
                e.tag === User.nickname + interlocutor.nickname || e.tag === interlocutor.nickname + User.nickname
            )
        if (blockedList.length > 0){
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
        dispatch({type: "Roomlist/addRoom", payload: newRoom,});
        let url = `http://${hostname}:4000/chat/createRoom`
        let response = fetch(url, {method : 'POST',
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom)
    }).then(ret => ret.json())
    }

    return (
        <div onClick={openConversation} className='user-icon-mess'></div> 
    )

}