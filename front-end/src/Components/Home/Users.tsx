import '../../styles/Components/Home/Users.css'
import { useState, useEffect, useContext } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function Users() {

    const User = useSelector((state: any) => state.User);
    const Userlist = useSelector((state: any) => state.UserList);
    const dispatch = useDispatch();
    
    return (
        <div className='users-content'>
                <p>Mes Amis</p>
            <div className='friends'>   
                {
                    Userlist.map((u : any)=> (
                        u.username != User.username ? 
                        <img key={u.id} className='user-avatar' src={u.avatar_url}></img>
                        : null
                    )
                    )
                }
            </div>  
        </div>

    );
}