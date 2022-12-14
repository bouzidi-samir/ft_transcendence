import { redirect } from "react-router"
import { useEffect, useState } from "react";
import Particle from "./Particle";
import Home from "../Containers/Home";
import { useParams, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Components/WaitingRoom.css"
import NewMemberSet from "./ProfilSettings/NewMemberSet";
import TFAset from './ProfilSettings/TFAset'
import Navbar from "./Share/Navbar";
import { Link } from "react-router-dom";
import { createTypeReferenceDirectiveResolutionCache } from "typescript";
import * as Colyseus from "colyseus.js";
import { Client } from "colyseus.js";
import { RoomInternalState } from "colyseus";


export default function MatchingPage (props : any) {
    const {redirection} = props;
    const User = useSelector((state: any) => state.User);
    const [time , setTime] = useState(0);
    let navigation = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser]  = useState(User);
    const {hostname} = document.location;

    let client: Client = new Colyseus.Client(`ws://${hostname}:4000`);
    let room : Colyseus.Room<unknown>;
    let userUpdate = {...User};

   function refresh()
   {
       var text = document.getElementById("myId");
       var text2 = document.getElementById("myId2");
       var intervalID = setInterval(myCallback, 1000);
       function myCallback() {
            if(text)
            {
                if (text.textContent === "Waiting for players")
                    text.textContent = "Waiting for players.";
                else if (text.textContent === "Waiting for players.")
                    text.textContent = "Waiting for players..";
                else if (text.textContent === "Waiting for players..")
                    text.textContent = "Waiting for players...";
                else if (text.textContent === "Waiting for players...")
                    text.textContent = "Waiting for players";
            }
        }

        var timer = setInterval(setTime, 1000);
        let seconds = 0;
        let minuts = 0;
        let hours = 0;
        function setTime(){
            seconds += 1;
            if (seconds === 60)
            {
                seconds = 0;
               minuts += 1;
            }
            if (minuts === 60)
            {
                minuts = 0;
                hours += 1;
            }
            if(text2)
                text2.textContent =  String(hours) + "h" + String(minuts) + "m" + String(seconds) + "s";
        }
   }

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

    useEffect( () => {
        refresh();
        findPlayers();
        return () => {
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
            <form className = 'form-newsetting'>
            <p id="myId" className="message">Waiting for players</p>
            <p id="myId2" className="timer">0h0m0s</p>
            </form>         
        </div>
        </>
    )
}