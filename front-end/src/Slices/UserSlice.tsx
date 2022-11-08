import {createSlice} from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

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
};

const UserSlice = createSlice({
    name: "User",
    initialState: User,
    reducers: {

        setUser : (state, action) => {
            state = {...action.payload};
            return state;
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
        }
        },
    },
);

export {UserSlice, User};