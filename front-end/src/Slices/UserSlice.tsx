import {createSlice} from "@reduxjs/toolkit";

const User = {
    id: "",
    username: "",
    nickname: "",
    registred:"",
    avatar_url: "",
    status: "",
    room_active: "",
    JWT_token: "",
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
        },
        },
    },
);

export {UserSlice, User};