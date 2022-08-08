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

export type UserGetAllQueryVariables = Exact<{ [key: string]: never; }>;


export type UserGetAllQuery = { __typename?: 'Query', userGetAll: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, email: string, name: string, avatar?: string | null, lastScore?: number | null, bestScore?: number | null, games?: Array<{ __typename?: 'Game', id: string, createdAt: any, updatedAt: any, score: number, win: boolean, loss: boolean }> | null }> };

export type UserGetByidQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type UserGetByidQuery = { __typename?: 'Query', userGetById: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, email: string, name: string, avatar?: string | null, lastScore?: number | null, bestScore?: number | null, games?: Array<{ __typename?: 'Game', id: string, score: number }> | null } };


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