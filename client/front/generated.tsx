import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthLoginOutput = {
  __typename?: 'AuthLoginOutput';
  accessToken: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  loss: Scalars['Boolean'];
  player?: Maybe<User>;
  score: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: User;
  win: Scalars['Boolean'];
};

export type GameCreateInput = {
  loss?: InputMaybe<Scalars['Boolean']>;
  score: Scalars['Float'];
  win?: InputMaybe<Scalars['Boolean']>;
};

export type GameCreateOutput = {
  __typename?: 'GameCreateOutput';
  game: Game;
};

export type GameDeleteOutput = {
  __typename?: 'GameDeleteOutput';
  gameId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authLogin: AuthLoginOutput;
  gameCreate: GameCreateOutput;
  gameDelete: GameDeleteOutput;
  userCreate: UserCreateOutput;
  userRemove: UserDeleteOutput;
  userUpdate: UserUpdateOutput;
};


export type MutationAuthLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationGameCreateArgs = {
  input: GameCreateInput;
};


export type MutationGameDeleteArgs = {
  gameId: Scalars['ID'];
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserRemoveArgs = {
  userId: Scalars['ID'];
};


export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  gameById: Game;
  gameByPlayerId: Array<Game>;
  gameList: Array<Game>;
  sayHello: Scalars['String'];
  userGetAll: Array<User>;
  userGetByEmail: User;
  userGetById: User;
};


export type QueryGameByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserGetByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserGetByIdArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bestScore?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  games?: Maybe<Array<Game>>;
  id: Scalars['ID'];
  lastScore?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserCreateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  bestScore?: InputMaybe<Scalars['Int']>;
  email: Scalars['String'];
  lastScore?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserCreateOutput = {
  __typename?: 'UserCreateOutput';
  user: User;
};

export type UserDeleteOutput = {
  __typename?: 'UserDeleteOutput';
  userId: Scalars['ID'];
};

export type UserUpdateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  bestScore?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  lastScore?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type UserUpdateOutput = {
  __typename?: 'UserUpdateOutput';
  user: User;
};

export type GameByIdQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type GameByIdQuery = { __typename?: 'Query', gameById: { __typename?: 'Game', id: string, createdAt: any, updatedAt: any, score: number, win: boolean, loss: boolean, player?: { __typename?: 'User', id: string } | null } };

export type GameListQueryVariables = Exact<{ [key: string]: never; }>;


export type GameListQuery = { __typename?: 'Query', gameList: Array<{ __typename?: 'Game', id: string, createdAt: any, updatedAt: any, score: number, win: boolean, loss: boolean, player?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, email: string, name: string } | null }> };

export type UserCreateMutationVariables = Exact<{
  input: UserCreateInput;
}>;


export type UserCreateMutation = { __typename?: 'Mutation', userCreate: { __typename?: 'UserCreateOutput', user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, name: string, email: string, lastScore?: number | null, bestScore?: number | null } } };

export type DeleteuserMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type DeleteuserMutation = { __typename?: 'Mutation', userRemove: { __typename?: 'UserDeleteOutput', userId: string } };

export type UserGetAllQueryVariables = Exact<{ [key: string]: never; }>;


export type UserGetAllQuery = { __typename?: 'Query', userGetAll: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, email: string, name: string, avatar?: string | null, lastScore?: number | null, bestScore?: number | null, games?: Array<{ __typename?: 'Game', id: string, createdAt: any, updatedAt: any, score: number, win: boolean, loss: boolean }> | null }> };

export type UserGetByidQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type UserGetByidQuery = { __typename?: 'Query', userGetById: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, email: string, name: string, avatar?: string | null, lastScore?: number | null, bestScore?: number | null, games?: Array<{ __typename?: 'Game', id: string, score: number }> | null } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', authLogin: { __typename?: 'AuthLoginOutput', accessToken: string } };


export const GameByIdDocument = gql`
    query gameById($input: String!) {
  gameById(id: $input) {
    id
    createdAt
    updatedAt
    score
    win
    loss
    player {
      id
    }
  }
}
    `;

/**
 * __useGameByIdQuery__
 *
 * To run a query within a React component, call `useGameByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameByIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGameByIdQuery(baseOptions: Apollo.QueryHookOptions<GameByIdQuery, GameByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GameByIdQuery, GameByIdQueryVariables>(GameByIdDocument, options);
      }
export function useGameByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GameByIdQuery, GameByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GameByIdQuery, GameByIdQueryVariables>(GameByIdDocument, options);
        }
export type GameByIdQueryHookResult = ReturnType<typeof useGameByIdQuery>;
export type GameByIdLazyQueryHookResult = ReturnType<typeof useGameByIdLazyQuery>;
export type GameByIdQueryResult = Apollo.QueryResult<GameByIdQuery, GameByIdQueryVariables>;
export const GameListDocument = gql`
    query gameList {
  gameList {
    id
    createdAt
    updatedAt
    score
    win
    loss
    player {
      id
      createdAt
      updatedAt
      email
      name
    }
  }
}
    `;

/**
 * __useGameListQuery__
 *
 * To run a query within a React component, call `useGameListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGameListQuery(baseOptions?: Apollo.QueryHookOptions<GameListQuery, GameListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GameListQuery, GameListQueryVariables>(GameListDocument, options);
      }
export function useGameListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GameListQuery, GameListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GameListQuery, GameListQueryVariables>(GameListDocument, options);
        }
export type GameListQueryHookResult = ReturnType<typeof useGameListQuery>;
export type GameListLazyQueryHookResult = ReturnType<typeof useGameListLazyQuery>;
export type GameListQueryResult = Apollo.QueryResult<GameListQuery, GameListQueryVariables>;
export const UserCreateDocument = gql`
    mutation userCreate($input: UserCreateInput!) {
  userCreate(input: $input) {
    user {
      id
      createdAt
      updatedAt
      name
      email
      lastScore
      bestScore
    }
  }
}
    `;
export type UserCreateMutationFn = Apollo.MutationFunction<UserCreateMutation, UserCreateMutationVariables>;

/**
 * __useUserCreateMutation__
 *
 * To run a mutation, you first call `useUserCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userCreateMutation, { data, loading, error }] = useUserCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserCreateMutation(baseOptions?: Apollo.MutationHookOptions<UserCreateMutation, UserCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserCreateMutation, UserCreateMutationVariables>(UserCreateDocument, options);
      }
export type UserCreateMutationHookResult = ReturnType<typeof useUserCreateMutation>;
export type UserCreateMutationResult = Apollo.MutationResult<UserCreateMutation>;
export type UserCreateMutationOptions = Apollo.BaseMutationOptions<UserCreateMutation, UserCreateMutationVariables>;
export const DeleteuserDocument = gql`
    mutation deleteuser($userId: ID!) {
  userRemove(userId: $userId) {
    userId
  }
}
    `;
export type DeleteuserMutationFn = Apollo.MutationFunction<DeleteuserMutation, DeleteuserMutationVariables>;

/**
 * __useDeleteuserMutation__
 *
 * To run a mutation, you first call `useDeleteuserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteuserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteuserMutation, { data, loading, error }] = useDeleteuserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteuserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteuserMutation, DeleteuserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteuserMutation, DeleteuserMutationVariables>(DeleteuserDocument, options);
      }
export type DeleteuserMutationHookResult = ReturnType<typeof useDeleteuserMutation>;
export type DeleteuserMutationResult = Apollo.MutationResult<DeleteuserMutation>;
export type DeleteuserMutationOptions = Apollo.BaseMutationOptions<DeleteuserMutation, DeleteuserMutationVariables>;
export const UserGetAllDocument = gql`
    query userGetAll {
  userGetAll {
    id
    createdAt
    updatedAt
    email
    name
    avatar
    lastScore
    bestScore
    games {
      id
      createdAt
      updatedAt
      score
      win
      loss
    }
  }
}
    `;

/**
 * __useUserGetAllQuery__
 *
 * To run a query within a React component, call `useUserGetAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGetAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGetAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserGetAllQuery(baseOptions?: Apollo.QueryHookOptions<UserGetAllQuery, UserGetAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGetAllQuery, UserGetAllQueryVariables>(UserGetAllDocument, options);
      }
export function useUserGetAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGetAllQuery, UserGetAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGetAllQuery, UserGetAllQueryVariables>(UserGetAllDocument, options);
        }
export type UserGetAllQueryHookResult = ReturnType<typeof useUserGetAllQuery>;
export type UserGetAllLazyQueryHookResult = ReturnType<typeof useUserGetAllLazyQuery>;
export type UserGetAllQueryResult = Apollo.QueryResult<UserGetAllQuery, UserGetAllQueryVariables>;
export const UserGetByidDocument = gql`
    query userGetByid($input: String!) {
  userGetById(id: $input) {
    id
    createdAt
    updatedAt
    email
    name
    avatar
    lastScore
    bestScore
    games {
      id
      score
    }
  }
}
    `;

/**
 * __useUserGetByidQuery__
 *
 * To run a query within a React component, call `useUserGetByidQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGetByidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGetByidQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserGetByidQuery(baseOptions: Apollo.QueryHookOptions<UserGetByidQuery, UserGetByidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGetByidQuery, UserGetByidQueryVariables>(UserGetByidDocument, options);
      }
export function useUserGetByidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGetByidQuery, UserGetByidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGetByidQuery, UserGetByidQueryVariables>(UserGetByidDocument, options);
        }
export type UserGetByidQueryHookResult = ReturnType<typeof useUserGetByidQuery>;
export type UserGetByidLazyQueryHookResult = ReturnType<typeof useUserGetByidLazyQuery>;
export type UserGetByidQueryResult = Apollo.QueryResult<UserGetByidQuery, UserGetByidQueryVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  authLogin(username: $username, password: $password) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;