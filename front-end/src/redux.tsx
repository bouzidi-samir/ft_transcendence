import { configureStore, createSlice, combineReducers} from "@reduxjs/toolkit";
import { persistStore} from "redux-persist";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";

const User = {
    id: "",
    username: "",
    nickname: "",
    registred:"",
    avatar_url: "",
    status: "",
};

const UserSlice = createSlice({

    name: "User",
    initialState: User,
    reducers: {

        setUser : (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.nickname = action.payload.nickname;
            state.registred = action.payload.registred;
            state.avatar_url = action.payload.avatar_url;
            state.status = action.payload.status;
        },
        setAvatar : (state, action) => {
            state.avatar_url = action.payload;
        }
        },   
    }
);

const persistConfig = {
    key:'root',
    version: 1,
    storage    
}

const reducer = combineReducers({
    User: UserSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store : any = configureStore({
    reducer: persistedReducer
});

