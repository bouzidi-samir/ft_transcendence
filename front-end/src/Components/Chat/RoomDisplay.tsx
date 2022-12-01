import { useSelector } from "react-redux";
import RoomSettings from "./RoomSettings";
import QuitRoom from "./QuitRoom";

export default function RoomDisplay() {
    
    const RoomActive = useSelector((state: any) => state.RoomActive);
    
    return (
        <div className='room-title'>
        {RoomActive.tag !== "global" ?  <QuitRoom/> : null}
        {RoomActive.tag !== "global" ? <h2>{RoomActive.tag}</h2> : null}
        {RoomActive.privateMessage === false && RoomActive.tag !== "global" ? <RoomSettings/> : null}
    </div>
    )
}

