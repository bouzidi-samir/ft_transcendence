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
            let Roomadded = {...action.payload}
            state.push(Roomadded);
            return state;
        }
        },
    },
);

export {RoomlistSlice};