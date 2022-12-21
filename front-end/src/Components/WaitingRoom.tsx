import { useEffect} from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Components/WaitingRoom.css"
import Navbar from "./Share/Navbar";
import * as Colyseus from "colyseus.js";
import { Client } from "colyseus.js";

export default function MatchingPage (props : any) {
    const User = useSelector((state: any) => state.User);
    let navigation = useNavigate();
    const dispatch = useDispatch();
    const {hostname} = document.location;
    let client: Client = new Colyseus.Client(`ws://${hostname}:4000`);
    let room : Colyseus.Room<unknown>;
    let userUpdate = {...User};
    let validated : number = 0;

   async function findPlayers()
   {
       room = await client?.joinOrCreate("matching_room", {access_token : User.JWT_token});
       if (room)
       {
           room.send("clientEllo", {ello : User.ello});
           room.onMessage("createRoom", async (message) => {
               userUpdate.status = "In game";
                userUpdate.room = await client?.create("my_room", {access_token : User.JWT_token}); 
                dispatch({
                    type : "User/setUser",
                    payload: userUpdate
                });
                room.send('room_id', {id : userUpdate.room.id})
                navigation('/game');
            })
            room.onMessage('joinRoom', async (message) => {
                userUpdate.status = "In game";
                userUpdate.room = await client?.joinById(message.id, {access_token : User.JWT_token});
                dispatch({
                    type : "User/setUser",
                    payload: userUpdate
                });
                navigation('/game');
            })
        }
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
                validated = 1;
                findPlayers();
			}
		})
	}


    useEffect( () => {
        checkGuard().catch(() =>
		{
			navigation('/Unauthorized')
		})

        return () => {
            if(validated === 1 )
                room.leave();
        }
     }, []
     )

    function redirect() {
       setTimeout(() => {
            navigation("/Game");
        }, 1000);
    }

    return (
        <>
            <Navbar />
        <div className="loading-content">
            <form className = 'form-game'>
            <h1>Master-Pong</h1>
            <h2 >En attente de joueurs...</h2>
             <h3>Tutoriel:</h3>   
            <p >-Dirige le paddle avec la souris pour renvoyer la balle.</p>
            <p >-Quitter la page de jeu est considere comme un abandon. </p>
            <p >-L' historique des matchs est affiché sur ton dashboard. </p>
            <h3>Bon Match!</h3>
            </form>         
        </div>
        </>
    )
}