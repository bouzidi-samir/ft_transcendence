import {useDispatch, useSelector} from 'react-redux';

export default function PrivateMessage(props: any) {
    
    const dispatch = useDispatch();
    const {interlocutor} = props;
    const User = useSelector((state: any) => state.User);
    const values = Object.values(User.JWT_token);

    function openConversation(e : any) {

        e.preventDefault();
        let newRoom : any = {
            username: User.username,
            nickname: User.nickname,
            tag: User.nickname + " " + interlocutor.nickname,
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