import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Alert from '../Share/Alert';
import '../../styles/Components/Chat/RoomSetting.css'


export default function RoomSettings() {
    
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const User = useSelector((state: any) => state.User);
    const [adminList, setAdminList] = useState<any>([])
    const[isAdmin, setIsAdmin] = useState(false);
    const [alert, setAlert] = useState(false);

    
    useEffect(() => {
        let url = `http://localhost:4000/chat/getRoomAdmin/${RoomActive.tag}`;
        fetch(url).then(ret => ret.json()).then(ret => setAdminList(ret))
    }, [RoomActive]
    )

    function setRoom() : any {
       
        if (!adminList.some((e : any) => e.nickname == User.nickname )) {
            setAlert(true);
            return ;
        }
        setIsAdmin(true)
    }
    
    return (
        <>
            <div  onClick={setRoom} className='room-settings'></div>
            {
                isAdmin ? 
                <>
                    <div className='fond1'></div>
                    <form className="room-settingsForm" data-aos="fade-up" data-aos-duration="1000">
                        <div onClick={()=>setIsAdmin(false)} className="cross-member"></div>
                        <h2>Configuration du salon </h2>
                        <label>Nom du salon:</label>       
                        <input type="text" className='room-name' placeholder='Nom du salon'></input>
                
                    </form>
                </>
                : null
            }
            {alert ? <Alert message="Cet action est réservée aux admins du channel." setWindow={setAlert} /> : null}
        </>
    )
}