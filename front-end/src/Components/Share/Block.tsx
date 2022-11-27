import {useEffect, useState} from 'react'
import { useSelector } from "react-redux";

export default function Block(props: any) {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const {toUsername} = props;
    const [blockedList, setBlockedList] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        let url = `http://${hostname}:4000/users/blockedPeople/${User.username}`;
        fetch(url, {headers: 
            {'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          },})
        .then(ret => ret.json()).then((ret) => { 
            let list : any  = ret.map((e: any) => (e.toUsername));
            if (status == "")
                list.some((e : any) => e == toUsername) ? setStatus('Débloquer') : setStatus('Bloquer')
            setBlockedList(list)
        })}, [status]
    )

    async function handleBlock(e: any) {
        e.preventDefault();
        if (status == "Bloquer") {
            setStatus('Débloquer');
            let url = `http://${hostname}:4000/users/blockUser`;
            const response = await fetch(url, {method: "POST",
            headers: {
                'Authorization': `Bearer ${User.JWT_token}`,
                'Content-Type': 'application/json',
                'cors': 'true'
            },
            body: JSON.stringify({
            username: User.username,
            targetUsername: toUsername,
            })})
        }
        else {
            setStatus('Bloquer');
            let url = `http://${hostname}:4000/users/unblockUser`;
            const response = await fetch(url, {method: "POST",
            headers: {
                'Authorization': `Bearer ${User.JWT_token}`,
                'Content-Type': 'application/json',
                'cors': 'true'
            },
            body: JSON.stringify({
            username: User.username,
            targetUsername: toUsername,
            })})
        }
    }
  
    return (
        <>
            {
                <button onClick={handleBlock} className="btn btn-secondary">{status}</button>
            }
        </>
  )
}
