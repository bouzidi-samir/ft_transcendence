import {createSlice} from "@reduxjs/toolkit";

const User = {
    id: "",
    username: "",
    nickname: "",
    registred:"",
    avatar_url: "",
    status: "",
    room_active: ""
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
        },
        logout : (state, action) => {
            state = User;
            return state;
        }
        },
    },
);

export {UserSlice, User};