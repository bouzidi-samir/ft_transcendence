import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:3000',
    cache: new InMemoryCache()
})


ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
        ,
    document.getElementById('root')
);

