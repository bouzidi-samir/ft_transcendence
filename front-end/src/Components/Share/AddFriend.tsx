import {useState, useEffect} from 'react'
import { useSelector } from "react-redux";

export default function AddFriend(props: any) {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const {toUsername} = props;
    const [friend, setFriend] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const url_ =   `http://${hostname}:4000/users/checkFriendship`
        const res = fetch(url_, {method: 'POST',  headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },body: JSON.stringify({
            fromUsername: User.username,
            toUsername: toUsername,
        })}).then(rep => rep.json()).then((result_) => {
            let p = Object.values(result_)
            if (status == "")
                p.length > 0 ? setStatus('Retirer') : setStatus('Ajouter')
            else if (p.length > 0){
                setFriend(true);
            }
        })
    }, [status]
    )

    async function handleFriend(e : any) {
        e.preventDefault();
        if (status == "Retirer"){
            setStatus('Ajouter');
            let urll = `http://${hostname}:4000/users/deleteOneFriendship`;
            const response = await fetch(urll, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
            },
            body: JSON.stringify({
                fromUsername: User.username,
                toUsername: toUsername,
                })})
            let result = await response.json();
        }
        else {
            if (User.username != toUsername) {
            setStatus('Retirer');
            let url = `http://${hostname}:4000/users/forceToBeMyFriend`;
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
            },
                body: JSON.stringify({
                myUsername: User.username,
                otherUsername: toUsername,
            })}).then(response => response.json())
            }
        }
    }

    return (
        <>
        {
            <button onClick={handleFriend} className="btn btn-primary btn-add">{status}</button>
        }
    </>
    )
}
