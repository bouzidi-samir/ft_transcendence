import { useSelector } from "react-redux";
import RoomSettings from "./RoomSettings";

export default function RoomDisplay() {
    
    const RoomActive = useSelector((state: any) => state.RoomActive);
    
    return (
        <div className='room-title'>
        <div className='room-picture'></div>
        <h2>{RoomActive.tag}</h2>
        {RoomActive.privateMessage === false ? <RoomSettings/> : null}
    </div>
    )
}

