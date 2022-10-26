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
console.log(userlist);
    return (
        <>
           <button onClick={addMember} className="btn btn-primary add" >+</button>
            {
                
                isAdmin ? 
                    <div className='addMember'>
                        <div onClick={()=>setIsAdmin(false)} className="cross-member"></div>
                        <h2>Invite un nouveau membre:</h2>
                        <div className='membertoadd'>
                        <div key={userlist[0].nickname} className='membertoadd-case'>
                                       <h2>{userlist[0].id}</h2>
                                    </div>
                         
                            {
                                userlist.map((user : any) => {
                                   
                                    <div key={user.nickname} className='membertoadd-case'>
                                       <h2>{user.id}</h2>
                                    </div>
                               
                                })
                            }               
                        </div>
                        <button className='btn btn-primary'>Inviter</button>
                    </div>
                :null
            }
        </>
    )


}