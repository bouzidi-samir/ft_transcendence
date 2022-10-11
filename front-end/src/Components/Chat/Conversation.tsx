import { useSelector } from "react-redux";
import NewMessage from "./NewMessage";

export default function Conversation (props : any) {
    
    const User = useSelector((state: any) => state.User);
    const messages = props.messages;

    return (
        <div className="conversation">
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