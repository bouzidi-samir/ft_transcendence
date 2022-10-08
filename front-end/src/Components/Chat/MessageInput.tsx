import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../Slices/UserSlice";
// import { Message } from "./Messages";

export default function MessageInput({send}: {send: (messagedata: any, roomTag: string) => void}) {
    
    
    const [value, setValue] = useState("");
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    
    const messagedata = {
        name: User.nickname,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        text: value,
        room: "test",
      };

    const handleClick = (value: string) => { 
        messagedata.text = value;
        send(messagedata, "test");
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