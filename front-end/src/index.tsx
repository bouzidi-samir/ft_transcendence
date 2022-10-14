import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { useDispatch } from 'react-redux';
import {store} from "./redux";
// import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import persistStore from 'redux-persist/es/persistStore';

let persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
        ,
    document.getElementById('root')
);

