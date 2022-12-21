import { configureStore, createSlice, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit";
import { persistStore} from "redux-persist";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import { UserSlice } from "./Slices/UserSlice";
import { UserlistSlice } from "./Slices/UserlistSlice";
import { RoomlistSlice } from "./Slices/RoomListSlice";
import { RoomActiveSlice } from "./Slices/RoomSlice";
import { GameSlice } from "./Slices/GameSlice";

const persistConfig = {
    key:'root',
    version: 1,
    storage    
}

const reducer = combineReducers({
    User: UserSlice.reducer,
    UserList: UserlistSlice.reducer,
    RoomList : RoomlistSlice.reducer,
    RoomActive : RoomActiveSlice.reducer,
    Game : GameSlice.reducer
})


const persistedReducer = persistReducer(persistConfig, reducer);

export const store : any = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
