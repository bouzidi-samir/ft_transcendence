import {createSlice} from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import * as Colyseus from "colyseus.js";

const User = {
    id: "",
    username: "",
    nickname: "",
    registred:"",
    avatar_url: "",
    status: "",
    room_active: "",
    rooms: [""],
    session:  "",
    JWT_token: "",
    TFOenabled : false,
    qrcode : "",
    ello : 0,
    gamePlayed : 0,
    gameWon : 0,
    gameLost : 0,
    room : undefined,
};

const UserSlice = createSlice({
    name: "User",
    initialState: User,
    reducers: {

        setUser : (state, action) => {
            state = {...action.payload};
            return state;
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.nickname = action.payload.nickname;
            state.registred = action.payload.registred;
            state.avatar_url = action.payload.avatar_url;
            state.status = action.payload.status;
            state.JWT_token = action.payload.JWT_token;
            state.TFOenabled = action.payload.TFOenabled;
            state.qrcode = action.payload.qrcode;
            state.ello = action.payload.ello;
            state.room = action.payload.room;
            state.gamePlayed = action.payload.gamePlayed;
            state.gameWon = action.payload.gameWon;
            state.gameLost = action.payload.gameLost;
        },
        setRooms : (state, action) => {
            let ret = [...action.payload]
            let roomname : string[] = [];
            ret.map(e => roomname.push(e.roomTag));
            state.rooms = [...roomname];
            return state;
        },
        logout : (state, action) => {
            state = User;
            return state;
        },
        setTwoFactor : (state, action) => {
           // console.log(action.payload);
            if (action.payload === true)
                state.TFOenabled = false
            else if (action.payload === false)
                state.TFOenabled = true ;
           // console.log(state.TFOenabled);
            
            return  (state);
        },
        setTwoFactorFalse : (state, action) => {
            console.log("here");
            state.TFOenabled = action.payload;
            return state;
        },
        },
    },
);

export {UserSlice, User};