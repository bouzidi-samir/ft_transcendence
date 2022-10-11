import { useSelector } from "react-redux";

export default function Conversation (props : any) {
    
    const User = useSelector((state: any) => state.User);
    const messages = props.messages;

    return (
        <div className="conversation">
        {messages.map((message: any, index: number) => (  
                <div key={index} className="buble" >
                    <img src={User.avatar_url} className="avatar-buble"></img>   
                <div key={index} className="message-bubleA"> 
                    <span>{message.fromUsername} ({message.time}) :</span>
                     <p>{message.text}</p>
                </div>
                </div>
            
        ))}
        </div>
    )
}