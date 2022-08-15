import { ApolloClient, ApolloProvider, createHttpLink, HttpLink, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";
import { setContext } from '@apollo/client/link/context';
import { API_URL } from "../constants/urls";

const GRAPHQL_ENDPOINT = 'http://localhost:4200/graphql';

const MyApolloprovider: React.FC<PropsWithChildren<{}>> = ({children}) =>{
    const client = new ApolloClient({
        uri: GRAPHQL_ENDPOINT,
        cache: new InMemoryCache()
    });
    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
}
// const httpLink = new HttpLink({
//     uri:`${API_URL}/graphql`,
// });

// const MyApolloprovider: React.FC<PropsWithChildren<{}>> = ({children}) =>{
//     const client = new ApolloClient({
//         link: httpLink,
//         cache: new InMemoryCache()
//     });
//     return <ApolloProvider client={client}>
//         {children}
//     </ApolloProvider>
// }

export default MyApolloprovider;