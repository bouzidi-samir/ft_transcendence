import { createSlice} from "@reduxjs/toolkit";
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
            console.log("äddes");
            let Roomadded = {...action.payload}
            state.push(Roomadded);
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