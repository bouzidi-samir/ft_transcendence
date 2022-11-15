import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function MessageInput({send}: {send: (messagedata: any) => void}) {
    const {hostname} = document.location;
    const [value, setValue] = useState("");
    const [checkMute, setCheckMute] = useState<boolean>(false);
    const [checkBan, setCheckBan] = useState<boolean>(false);
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    
    const messagedata = {
      fromUsername: String(User.username),
      fromNickname: String(User.nickname),
      fromAvatar: String(User.avatar_url),
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        text: value,
        room: String(RoomActive.tag),
      };

    async function handleCheck(e: any) {

      e.preventDefault();
      let url = `http://${hostname}:4000/chat/checkMute`;
        const response = await fetch(url, {method: "POST",
        headers: {
        'Authorization': `Bearer ${User.JWT_token}`,
        'Content-Type': 'application/json',
        'cors': 'true'
        },
        body: JSON.stringify({
          username: User.username,
          tag : RoomActive.tag,
        })
      }
      ).then(response => response.json())
      setCheckMute(response);

      let url_ = `http://${hostname}:4000/chat/checkBan`;
        const response_ = await fetch(url_, {method: "POST",
        headers: {
        'Authorization': `Bearer ${User.JWT_token}`,
        'Content-Type': 'application/json',
        'cors': 'true'
        },
        body: JSON.stringify({
          username: User.username,
          tag : RoomActive.tag,
        })
      }
      ).then(response_ => response_.json())
      setCheckBan(response_);
    }

    const handleClick = (value: string) => { 

        messagedata.text = value;
        send(messagedata);
        setValue("");
    }
    
    return (
                    
          <div className="send-zone">
            <div className='ChatMessageInput'>
                <div className='Input'>
                    <input onChange={(e)=>{setValue(e.target.value); handleCheck(e)}} placeholder="Tapez votre message..." value={value} />
                    { checkMute ? 
                    ( <button className="btn btn-primary" onClick={() => {setValue(""); alert('You are temporary muted in this room')}}>Envoyer</button>)
                    : checkBan ?
                    ( <button className="btn btn-primary" onClick={() => {setValue(""); alert('You are Banned from this room')}}>Envoyer</button>)
                    :
                    ( <button className="btn btn-primary" onClick={() => handleClick(value)}>Envoyer</button>)
                    }
                </div>
            </div>
          </div>
    )
}