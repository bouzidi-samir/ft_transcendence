import { redirect } from "react-router"
import { useEffect, useState } from "react";
import Particle from "./Particle";
import Home from "../Containers/Home";
import { useParams, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Components/Share/MatchingPage.css"
import NewMemberSet from "./ProfilSettings/NewMemberSet";
import GameParameters from "./Game/GameParameters";
import TFAset from './ProfilSettings/TFAset'
import Navbar from "./Share/Navbar";
import { Link } from "react-router-dom";
import * as Colyseus from "colyseus.js";
import { Client } from "colyseus.js";
import { Any } from "typeorm";
import { wait } from "@testing-library/user-event/dist/utils";

export default function MatchingPage (props : any) {

    const {redirection} = props;
    const User = useSelector((state: any) => state.User);
    const [parameter , setParameter] = useState(false);
    const [time , setTime] = useState(0);
    let navigation = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser]  = useState(User);
    const [hide, setHide] = useState(0);
    const {hostname} = document.location;
    let client: Client = new Colyseus.Client(`ws://${hostname}:4000`);
    const [rooms, setRooms] = useState<Colyseus.RoomAvailable<any>[]>();
    let roomsNb : number | undefined;
    let userUpdate = {...User};

    async function defineRooms()
    {
       await setRooms(await client.getAvailableRooms("my_room"));
    }


    const checkGuard = async () =>
	{
		let url_ = `http://${hostname}:4000/games/checkGuard`;
        await fetch(url_, {method: "POST",
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
        username: User.username,
        })
        })
		.then((response) => {
			if (response.status === 401)
				throw new Error()
			else
			{
                defineRooms();
			}
		})
	}

    useEffect( () => {
		let url_ = `http://${hostname}:4000/chat/setOffGame`;
        fetch(url_, {method: "POST",
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username: User.username,
            })
        }
        )
	}, [])

    useEffect( () => {
        checkGuard().catch(() =>
		{
			navigation('/Unauthorized')
		})
     }, []
     )

    function redirect() {
       setTimeout(() => {
            navigation("/Home");
        }, 1000);
    }

    const enableMenu = async (e : any) =>
    {
        e.preventDefault();
        roomsNb = rooms?.length;
        if (hide === 0)
            setHide(1);
        else
            setHide(0);
    }

    async function spectate(event : any, key : any)
    {
        if (rooms)
        {
            userUpdate.room = await client?.joinById(rooms[key].roomId, {access_token : User.JWT_token});
            dispatch({
                type : "User/setUser",
                payload: userUpdate
            });
            navigation('/game');
        }
    }

    const getList =  () =>
    {
        let content = [];
        if (rooms && rooms.length > 0)
        {
            for (let i = 0; i < rooms.length; i++) {
                content.push(<li className="listButton" key={i} onClick={event => spectate(event, i)}>{rooms[i].metadata.player1} VS {rooms[i].metadata.player2}</li>);
            }
        }
        else 
        {
            content.push(<li className="listButton" key="1">No games found.</li>)
        }
        return content;
    }

    return (
        <>
            <Navbar />
        <div className="loading-contents">
            <div className = 'form-newsettings'>
            <h1 >Master Pong</h1>

                <Link to ="/WaitingRoom" style={{textDecoration: 'none', width:'100%'}}>
                <button className="MultiButtons">
                    MultiJoueur
                </button>
                </Link>
                <button onClick={enableMenu} className="SingleButtons">Spectate</button>
                <button onClick={() => setParameter(true)} className="SingleButtons" >Paramètres</button>
                {hide === 1 &&
                    <ul className="list_match">{getList()}</ul>
                }
            </div>
        </div>
        {parameter ? <GameParameters setParameter = {setParameter}/> : null}
        </>
    )
}