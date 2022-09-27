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
        },
    },
);

export {RoomlistSlice};