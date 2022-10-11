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
    JWT_token: "",
    socket: Socket
};

const UserSlice = createSlice({
    name: "User",
    initialState: User,
    reducers: {

        setUser : (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.nickname = action.payload.nickname;
            state.registred = action.payload.registred;
            state.avatar_url = action.payload.avatar_url;
            state.status = action.payload.status;
            state.JWT_token = action.payload.JWT_token;
            state.socket = action.payload.newSocket;
        },
        setRooms : (state, action) => {
            let ret = [...action.payload]
            let roomname : string[] = [];
            ret.map(e => roomname.push(e.roomTag));
            state.rooms = [...roomname];
            return state;
        },
        addRoom : (state, action) => {
            if (!state.rooms.some(e => e == action.payload))
                state.rooms.push(action.payload);
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