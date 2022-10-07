import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../Slices/UserSlice";

export default function MessageInput({send}: {send: (message: {name: any, time: string, text: string}) => void}) {
    
    
    const [value, setValue] = useState("");
    const User = useSelector((state: any) => state.User);

    const messagedata = {
        name: User.nickname,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        text: value,
      };

    const handleClick = (value: string) => { 

        // messagedata.name = User.username;
        messagedata.text = value;
        
        send(messagedata);
        setValue("");
        
      }
    
    return (
            <div className='ChatMessageInput'>
                <div className='Input'>
                    <input onChange={(e)=>setValue(e.target.value)} placeholder="Tapez votre message..." value={value} />
                    <button className="btn btn-primary" onClick={() => handleClick(value)}>Envoyer</button>
                </div>
            </div>
    )
}