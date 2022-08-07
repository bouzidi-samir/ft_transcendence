import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

const GRAPHQQL_ENDPOINT = 'http://localhost:4200?graphql';

const MyApolloprovider: React.FC<PropsWithChildren<{}>> = ({children}) =>{
    const client = new ApolloClient({
        uri: GRAPHQQL_ENDPOINT,
        cache: new InMemoryCache()
    });
    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>

}

export default MyApolloprovider;