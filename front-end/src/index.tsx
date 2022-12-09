import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { useDispatch } from 'react-redux';
import {store} from "./redux";
// import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import persistStore from 'redux-persist/es/persistStore';
import { socket, SocketContext } from './Context/socket';

let persistor = persistStore(store);

ReactDOM.render(
    <SocketContext.Provider value={socket}>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
    </SocketContext.Provider>
        ,
    document.getElementById('root')
);

