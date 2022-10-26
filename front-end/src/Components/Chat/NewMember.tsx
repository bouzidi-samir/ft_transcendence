import '../../styles/Components/Chat/NewMember.css'
import { useEffect, useState } from 'react'

export default function NewMember() {

    const[isAdmin, setIsAdmin] = useState(false);

    function addMember() : void {
     
    }

    return (
        <>
           <button onClick={addMember} className="btn btn-primary add" >+</button>
            {
                isAdmin ? 
                    <div className='addMember'>
                    </div>
                :null
            }
        </>
    )

}