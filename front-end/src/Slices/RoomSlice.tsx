import {createSlice} from "@reduxjs/toolkit";

const Room = {

};

const RoomActiveSlice = createSlice({
    name: "RoomActive",
    initialState: Room,
    reducers: {
        setRoomActive : (state, action) => {
            state = {...action.payload};
            return state;
        },
        },
    },
);
export {RoomActiveSlice, Room};