import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store} from "./redux";
import persistStore from 'redux-persist/es/persistStore';
import { socket, SocketContext } from './Context/socket';

let persistor = persistStore(store);
const root  = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <SocketContext.Provider value={socket}>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
    </SocketContext.Provider>
        ,

);

