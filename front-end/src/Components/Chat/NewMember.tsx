import '../../styles/Components/Chat/NewMember.css'
import { useEffect, useState } from 'react'
import Cross from '../Share/Cross';
import { useSelector } from "react-redux";
import Alert from '../Share/Alert';

export default function NewMember() {

    const[isAdmin, setIsAdmin] = useState(false);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const User = useSelector((state: any) => state.User);
    const [userlist, setUserlist] = useState<any>([])
    const [adminList, setAdminList] = useState<any>([])
    const [statu, setStatu] = useState(""); 
    const [alert, setAlert] = useState(false);
 
    useEffect(() => {
        let url = "http://localhost:4000/users";
        fetch(url).then(ret => ret.json()).then(ret => setUserlist(ret))
    }, []
    )

    useEffect(() => {
        let url = `http://localhost:4000/chat/getRoomAdmin/${RoomActive.tag}`;
        fetch(url).then(ret => ret.json()).then(ret => setAdminList(ret))
    }, [RoomActive]
    )
    
    function addMember() : any {
       
        if (!adminList.some((e : any) => e.nickname == User.nickname )) {
            setAlert(true);
            return ;
        }
        setIsAdmin(true)
    }

    function sendInvitation() : void {

        setStatu("Inviation envoiyée!");
        setTimeout(() => {
            setStatu("");
        }, 1000);

    }

    return (
        <>
           <button onClick={addMember} className="btn btn-primary add" >+</button>
            {
                
                isAdmin ? 
                <>
                <div className='fond1'></div>
                <div className='addMember'  data-aos="fade-up" data-aos-duration="1000">
                        <div onClick={()=>setIsAdmin(false)} className="cross-member"></div>
                        <h2>Invite un nouveau membre:</h2>
                        <div className='membertoadd'>
                         
                            {
                                userlist.map((user : any) => (
                                    <div key={user.nickname} className='membertoadd-case'>
                                       <img src={user.avatar_url} className='membertoadd-avatar'></img>
                                       <h2>{user.nickname}</h2>
                                       <button onClick={sendInvitation} className='btn btn-primary'>Inviter</button>
                                    </div>
                                ))
                            }               
                        </div>
                            <p>{statu}</p>
                    </div>
                </>
                : null
            }
            {alert ? <Alert message="Cet action est réservée aux admins du channel." setWindow={setAlert} /> : null}
        </>
    )

}