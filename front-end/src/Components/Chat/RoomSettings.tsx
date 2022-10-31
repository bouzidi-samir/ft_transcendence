import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Alert from '../Share/Alert';


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
            {alert ? <Alert message="Cet action est réservée aux admins du channel." setWindow={setAlert} /> : null}
        </>
    )
}