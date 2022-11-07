import { useSelector } from "react-redux";



export default function RoomDisplay() {
    
    const RoomActive = useSelector((state: any) => state.RoomActive);
    
    return (
        <div className='room-title'>
        <div className='room-picture'></div>
        <h2>{RoomActive.tag}</h2>
        <div className='room-settings'></div>
    </div>
    )
}

