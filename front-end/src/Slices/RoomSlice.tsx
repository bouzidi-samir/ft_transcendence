import {createSlice} from "@reduxjs/toolkit";

const Room = {

};

const RoomSlice = createSlice({
    name: "Room",
    initialState: Room,
    reducers: {
        setRoom : (state, action) => {
        },
        },
    },
);
export {RoomSlice, Room};