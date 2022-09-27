import { configureStore, createSlice, combineReducers} from "@reduxjs/toolkit";
import { persistStore} from "redux-persist";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import { UserSlice } from "./Slices/UserSlice";
import { UserlistSlice } from "./Slices/UserlistSlice";

const persistConfig = {
    key:'root',
    version: 1,
    storage    
}

const reducer = combineReducers({
    User: UserSlice.reducer,
    UserList: UserlistSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store : any = configureStore({
    reducer: persistedReducer
});

