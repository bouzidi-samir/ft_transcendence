import { useSelector } from "react-redux";
import NewMessage from "./NewMessage";
import { useEffect, useState } from "react";

export default function Conversation (props : any) {
    const User = useSelector((state: any) => state.User);
    const messages = props.messages;
    let element : any;

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
                     <NewMessage key={message.fromUsername+ index} message={message}/>
                ))
            : null           
        }
        </div> 
    )
}
