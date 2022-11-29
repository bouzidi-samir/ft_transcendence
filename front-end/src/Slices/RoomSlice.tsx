
import {createSlice} from "@reduxjs/toolkit";

const Room = {
    tag: "global",
    public: true,
    private: false,
    privateMessage: false,
    password: false
};

const RoomActiveSlice = createSlice({
    name: "RoomActive",
    initialState: Room,
    reducers: {
        setRoomActive : (state, action) => {
            state = {...action.payload};
            return state;
        }, 
        logout : (state, action) => {
            state = Room;
            return state;
        }
        },
    },
);
export {RoomActiveSlice, Room};