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
        updateUser : (state, action) => {
            let userupdate = action.payload;
            let newList = [...state];
            newList.forEach((e: any) => {
                //if (e.id == userupdate.id)
                  //  e.nickname == userupdate.nickname;
            }
            )
            state = [...newList];
            return state;
        }
        },
    },
);

export {UserlistSlice};