import { useState, useEffect } from 'react';
import '../../styles/Components/Share/UserProfil.css'
import { useParams } from 'react-router';
import Navbar from './Navbar';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import Cross from './Cross';
import Block from './Block';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserProfil() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const[addroom, setAddroom] = useState(false);
    const user_id = useParams();
    const [user, setUser]  = useState(User);
    const [friend, setFriend] = useState(false);
    const location = useLocation();
    let navigation = useNavigate();
  
    async function fetchData(){
        const url = `http://${hostname}:4000/users/search/${user_id.id}`
        await fetch(url, {headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        }})
        .then(response => response.json())
        .then ((data) => {
            setUser(data);
        }
            );
        const url_ =   `http://${hostname}:4000/users/checkFriendship`
        const res = await fetch(url_, {method: 'POST',  headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },body: JSON.stringify({
            fromUsername: User.username,
            toUsername: location.state.toBlock.user.username,
        })})
        let result_ = await res.json();
        console.log(result_);
        let p = Object.values(result_)
        if (p.length > 0){
            setFriend(true);
        }
    }

    useEffect(()=>{
        setFriend(false);
        fetchData();
    }, [])
         
    async function handleNewFriend(e: any) {
            e.preventDefault();
            if (friend == true){
                console.log('friend == true, deleteOnefriendship');
                console.log('user in delete', user);
                console.log('User in delete', User);
                let urll = `http://${hostname}:4000/users/deleteOneFriendship`;
                const response = await fetch(urll, {method: "POST",
                headers: {
                'Authorization': `Bearer ${User.JWT_token}`,
                'Content-Type': 'application/json',
                'cors': 'true'
                },
                body: JSON.stringify({
                    fromUsername: User.username,
                    toUsername: user.username,
                    })
                }
                )
                let result = await response.json();
                console.log('myFriend is killed', result);
            }
            else {
                if (User.username != user.username) {
                let url = `http://${hostname}:4000/users/forceToBeMyFriend`;
                const response = await fetch(url, {method: "POST",
                headers: {
                'Authorization': `Bearer ${User.JWT_token}`,
                'Content-Type': 'application/json',
                'cors': 'true'
                },
                 body: JSON.stringify({
                myUsername: User.username,
                otherUsername: user.username,
                })
                }
                ).then(response => response.json())
                console.log('myFriend', response);
                }
            }
        }

    return (
        <div className='userprofil'>
        <Navbar></Navbar>
        <div className="profilset-content">
            <form className="form-setting" data-aos="fade-up" data-aos-duration="1000" >
                <Cross lastPage="/Chat"/>
                <img  className="vignette-user" src={user.avatar_url}></img>
                <h3>{user.nickname}</h3>
                <p>{user.status}</p>
                <hr></hr>
                <div className='ecusson-user'></div>
                <p>Novice</p>
                { friend == true  ? 
                <button onClick={handleNewFriend} className="btn btn-primary btn-add">Enlever</button>
                : <button onClick={handleNewFriend} className="btn btn-primary btn-add">Ajouter</button>
                }
               <Block toUsername={user_id.id}/>
            </form>
        </div>
        </div>
    );
}