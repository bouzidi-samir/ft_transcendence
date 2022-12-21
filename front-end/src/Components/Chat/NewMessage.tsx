import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function NewMessage(props: any) {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const message = props.message;
    let bubleStyle : {bullDirection : any, bullColor : string};
    let avatar : string;
    const [blockedList, setBlockedList] = useState([]);

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
 
    if (message.fromNickname == User.nickname) { 
        bubleStyle = {bullDirection: "start", bullColor : "blueviolet"};
        avatar = User.avatar_url;
    }
    else {
        bubleStyle = {bullDirection: "end", bullColor : "coral"};
        avatar = message.fromAvatar;
    }

    return (
        <>
            {
                !blockedList.some((e : string) => e == message.fromUsername) ?
                <div className="buble-zone" style={{justifyContent: bubleStyle.bullDirection}}>
                    <img src={avatar} className="avatar-buble"></img>   
                    <div key={message.index} className="message-bubleA" style={{backgroundColor: bubleStyle.bullColor}}> 
                    <span>{message.fromNickname} ({message.time}) :</span>
                    <p className="buble-text">{message.text}</p> 
                    </div>
                </div>
                : null
            }
        </>
    )
}