import { useSelector } from "react-redux";
import NewMessage from "./NewMessage";
import { useEffect, useState } from "react";

export default function Conversation (props : any) {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const messages = props.messages;
    let element : any;
    const [blockedList, setBlockedList] = useState();

    useEffect(() => {
        let url = `http://${hostname}:4000/users/blockedPeople/${User.username}`;
        fetch(url, {headers: 
            {'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          },})
        .then(ret => ret.json()).then((ret) => { 
            let list : any  = ret.map((e: any) => (e.toUsername));
            setBlockedList(list)
        }
        )
    }
    , []
    )

    useEffect(() => {
        element = document.getElementById('conv');
        element.scrollTop = element.scrollHeight;
    }
    , [ messages]
    )

    return (
        <div className="conversation" id="conv">
        {
            messages.length > 0 ?
                messages.map((message: any, index: number) => (  
                     <NewMessage key={message.id} message={message}/>
                ))
            : null           
        }
        </div> 
    )
}
