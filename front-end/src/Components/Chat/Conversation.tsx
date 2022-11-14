import { useSelector } from "react-redux";
import NewMessage from "./NewMessage";
import { useEffect } from "react";

export default function Conversation (props : any) {
 
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
                     <NewMessage message={message}/>
                ))
            : null           
        }
        </div> 
    )
}
