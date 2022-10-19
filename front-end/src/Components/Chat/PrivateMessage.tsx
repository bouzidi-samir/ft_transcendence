import {useDispatch, useSelector} from 'react-redux';

export default function PrivateMessage(props: any) {
    
    const dispatch = useDispatch();
    const {interlocutor} = props;
    const User = useSelector((state: any) => state.User);
    let Roomlist = useSelector((state: any) => state.RoomList);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const values = Object.values(User.JWT_token);

    function openConversation(e : any) {
        e.preventDefault();
        let check = Roomlist.filter((e: any) => e.tag == interlocutor.nickname)
        if (check.length > 0){
            dispatch({type: "RoomActive/setRoomActive",payload: check[0]});
            return;
        }
        let newRoom : any = {
            username: User.username,
            nickname: User.nickname,
            tag: interlocutor.nickname,
            public: false,
            private: true,
            privateMessage: true,
            password: ""
        }
        dispatch({type: "Roomlist/addRoom", payload: newRoom,});
        let url = "http://localhost:4000/chat/createRoom"
        let response = fetch(url, {method : 'POST',
        headers: {
            'Authorization': `Bearer ${values[0]}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom)
    })
    }

    return (
        <div onClick={openConversation} className='user-icon-mess'></div> 
    )


}