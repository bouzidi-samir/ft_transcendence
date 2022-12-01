import { useSelector } from "react-redux";
import RoomSettings from "./RoomSettings";
import QuitRoom from "./QuitRoom";

export default function RoomDisplay() {
    
    const RoomActive = useSelector((state: any) => state.RoomActive);
    
    return (
        <div className='room-title'>
        <QuitRoom/>
        <h2>{RoomActive.tag}</h2>
        {RoomActive.privateMessage === false && RoomActive.tag !== "global" ? <RoomSettings/> : null}
    </div>
    )
}

