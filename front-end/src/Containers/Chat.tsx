import "../styles/Containers/Chat.css";
import Navbar from "../Components/Share/Navbar";
import Rooms from "../Components/Chat/Rooms";
import Messages from "../Components/Chat/Messages";
import UserChat from "../Components/Chat/UserChat";

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