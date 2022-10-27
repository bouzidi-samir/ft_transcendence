import '../../styles/Components/Chat/NewMember.css'
import { useEffect, useState } from 'react'
import Cross from '../Share/Cross';
import { useSelector } from "react-redux";

export default function NewMember() {

    const[isAdmin, setIsAdmin] = useState(false);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const [userlist, setUserlist] = useState<any>([])
 
    useEffect(() => {
        let url = "http://localhost:4000/users";
        fetch(url).then(ret => ret.json()).then(ret => setUserlist(ret))
    }, []
    )


    function addMember() : void {
     setIsAdmin(true)
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
                                    </div>
                               
                                ))
                            }               
                        </div>
                        <button className='btn btn-primary'>Inviter</button>
                    </div>
                </>
                :null
            }
        </>
    )


}