import { createSlice} from "@reduxjs/toolkit";
import { Check } from "typeorm";
import { Room } from "./RoomSlice";

const RoomlistSlice = createSlice({
    name: "Roomlist",
    initialState: [Room],
    reducers: {
        setRoomlist : (state, action) => {
            state = [...action.payload];
            return state;
        },
        addRoom : (state, action) => {
            let Roomadded = {...action.payload}
            state.push(Roomadded);
            return state;
        },
        updateRoomList : (state, action) => {
            let url = "http://localhost:4000/chat/rooms";
            fetch(url).then(response => response.json()).then(data => [...data])
            return state;
        },
        logout : (state, action) => {
            state = [Room];
            return state;
        }
        },
    },
);

export {RoomlistSlice};