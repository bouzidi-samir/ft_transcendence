import {createSlice} from "@reduxjs/toolkit";

const Game = {
    padColor: "white",
};

const GameSlice = createSlice({
    name: "Game",
    initialState: Game,
    reducers: {
        setGame : (state, action) => {
            state = {...action.payload};
            return state;
        }, 
        },
    },
);

export {GameSlice, Game};