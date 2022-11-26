import * as Colyseus from "colyseus.js";
import { Client } from "colyseus.js";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { io, Socket } from "socket.io-client";


export default function GameLauncher(props: any) {
    const location = useLocation();
    const User = useSelector((state: any) => state.User);
    let navigation = useNavigate();
    const dispatch = useDispatch();
    const {hostname} = document.location;
    const [socket, setSocket] = useState<Socket>();
    const [alertGame, setAlertGame] = useState<any>();
    const invitation = {
        fromUsername: User.username,
        toUsername: props.player2.username,
    };

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket)
    }, [setSocket])

    const alertAnswer = (answer: any) => {
        setAlertGame(answer);
    }
    
    useEffect(() => {
        socket?.on( "acceptGameServer",   alertAnswer);
        socket?.on( 'refuseGameServer',   alertAnswer);
        return () => {
            socket?.off("acceptGameServer",  alertAnswer);
            socket?.off("refuseGameServer",  alertAnswer);
        }
    }, [alertAnswer])


    async function sendInvitation() {
        
        let response= await fetch(`http://${hostname}:4000/chat/gameInvitation`, {method: "POST", headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          },
          body: JSON.stringify({
            senderName: User.username,
            receiverName: props.player2.username,
              })
          })
        let result = await response.json();
        socket?.emit("invitationGame", invitation);
    }

    useEffect(()=>{
        createGame();
    },[alertAnswer])


    async function createGame()
    {
        // if (alertGame.fromUsername == User.username && alertGame.text ==  "OK"){
            if (alertGame.text ==  "OK"){
            console.log('alertGame', alertGame)
            console.log("le player2 est OK pour jouer");
            setAlertGame({})
        }
        
        // if (alertGame.fromUsername == User.username && alertGame.text ==  "KO"){
            if (alertGame.text ==  "KO"){
            console.log('alertGame', alertGame)
            console.log("le player2 est KO (pas OK) pour jouer");
            setAlertGame({})
        }


        // let client: Client = new Colyseus.Client(`ws://${hostname}:4000`);
        // const player1 = User.username;
        // const player2 = props.player2.username;
        // console.log(props);
        // let response= await fetch(`http://${hostname}:4000/users/search/${player2}`, {headers: {
        //     'Authorization': `Bearer ${User.JWT_token}`,
        //     'Content-Type': 'application/json',
        //     'cors': 'true'
        //   }})
        // let player2Data = await response.json();
        // if ((player2Data.ello - User.ello > 50) || (player2Data.ello - User.ello < -50))
        // {
            //POPUP pour dire qu il n est pas possible de jouer avec ce joueur car trop grande difference d ello.
        // }
        // else if (player1 === player2)
        // {
            //POPUP pour dire qu on ne peut pas jouer contre soi meme.
        // }
        // else
        // {
        //     let answer = 1;
            // ENVOYER LE POPUP A L INVITE ET METTRE ANSWER A 0 OU 1 SELON LE CHOIX
            // if (answer === 1)
            // {
            //     let room = await client?.create("private_room", {});
            //     room.send("clientName", {player1 : player1});
            //     room.onMessage("createRoom", async (message) => {
            //         userUpdate.room = await client?.create("my_room", {}); 
            //         dispatch({
            //             type : "User/setUser",
            //             payload: userUpdate
            //         });
            //         room.send("gameId", {id: userUpdate.room.id});
            //         room.leave();
            //         navigation('/game');
            //     })
                // TROUVER UN MOYEN DE FAIRE EXECUTER TOUT CA AU JOUEUR 2 APRES AVOIR ACCEPTE.
                

                   /* async function join ()
                    {
                        let rooms;
                        let room : Colyseus.Room<unknown>;
                        let userUpdate = {...User};
                        rooms = await client.getAvailableRooms("private_room")
                        for (let i = 0; i < rooms.length; i++)
                        {
                            if (rooms[i].metadata.player1 === player1)
                            {
                                room = await client?.joinById(rooms[i].roomId, {});
                                room.send("joined", {});
                                room.onMessage('joinRoom', async (message) => {
                                    userUpdate.room = await client?.joinById(message.id, {});
                                    dispatch({
                                        type : "User/setUser",
                                        payload: userUpdate
                                    });
                                    room.leave();
                                    navigation('/game');
                                })
                            }
                        }
                    }*/

                
            // }
// 
        // }
    }

    return (
        <div className='user-icon-game'onClick={sendInvitation}>
        </div> 
    )

}