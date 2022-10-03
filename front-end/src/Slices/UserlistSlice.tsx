import { createSlice} from "@reduxjs/toolkit";
import { User } from "./UserSlice";

const UserlistSlice = createSlice({
    name: "Userlist",
    initialState: [User],
    reducers: {
        setUserlist : (state, action) => {
            state = [...action.payload];
            return state;
        },
        },
    },
);

export {UserlistSlice};