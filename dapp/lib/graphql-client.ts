import { useMemo } from 'react'
import { GraphQLClient } from 'graphql-hooks'
// @ts-ignore: Unreachable code error
import memCache from 'graphql-hooks-memcache'

// @ts-ignore: Unreachable code error
let graphQLClient

// @ts-ignore: Unreachable code error
function createClient(initialState) {
  return new GraphQLClient({
    ssrMode: typeof window === "undefined",
    url: "https://api.airstack.xyz/gql", // Server URL (must be absolute)
    cache: memCache({ initialState }),
  });
}

export function initializeGraphQL(initialState = null) {
  // @ts-ignore: Unreachable code error
  const _graphQLClient = graphQLClient ?? createClient(initialState);

  // After navigating to a page with an initial GraphQL state, create a new cache with the
  // current state merged with the incoming state and set it to the GraphQL client.
  // This is necessary because the initial state of `memCache` can only be set once

  // @ts-ignore: Unreachable code error
  if (initialState && graphQLClient) {
    graphQLClient.cache = memCache({
      initialState: Object.assign(
        graphQLClient.cache.getInitialState(),
        initialState
      ),
    });
  }
  // For SSG and SSR always create a new GraphQL Client
  if (typeof window === "undefined") return _graphQLClient;
  // Create the GraphQL Client once in the client

  // @ts-ignore: Unreachable code error
  if (!graphQLClient) graphQLClient = _graphQLClient;

  return _graphQLClient;
}

// @ts-ignore: Unreachable code error
export function useGraphQLClient(initialState) {
  const store = useMemo(() => initializeGraphQL(initialState), [initialState])
  return store
}