import "../styles/Containers/Chat.css";
import Navbar from "../Components/Navbar";
import Rooms from "../Components/Rooms";
import Messages from "../Components/Messages";
import UserChat from "../Components/UserChat";

export default function Chat() {
    
    return (
      <>
        <Navbar/> 
        <div className="chat-content">
            <Rooms/>
            <Messages/>
            <UserChat/>
        </div>
      </>
    )
  }