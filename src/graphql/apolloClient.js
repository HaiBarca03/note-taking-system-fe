// src/graphql/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink, fromPromise } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access_token");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

let isRefreshing = false;
let pendingRequests = [];

const resolvePendingRequests = () => {
  pendingRequests.forEach((resolve) => resolve());
  pendingRequests = [];
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED' || err.message.includes('401')) {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          localStorage.removeItem("access_token");
          window.location.href = "/login";
          return;
        }

        if (!isRefreshing) {
          isRefreshing = true;
          return fromPromise(
            fetch(import.meta.env.VITE_BACKEND_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                query: `mutation RefreshToken($token: String!) {
                  refreshToken(token: $token) {
                    access_token
                    refresh_token
                  }
                }`,
                variables: { token: refreshToken }
              })
            }).then(res => res.json())
          ).filter(value => Boolean(value))
           .flatMap((res) => {
             const data = res.data?.refreshToken;
             if (!data) {
               throw new Error("Refresh failed");
             }
             localStorage.setItem("access_token", data.access_token);
             localStorage.setItem("refresh_token", data.refresh_token);
             isRefreshing = false;
             resolvePendingRequests();

             const oldHeaders = operation.getContext().headers;
             operation.setContext({
               headers: {
                 ...oldHeaders,
                 authorization: `Bearer ${data.access_token}`,
               },
             });
             return forward(operation);
           }).catch(() => {
             isRefreshing = false;
             pendingRequests = [];
             localStorage.removeItem("access_token");
             localStorage.removeItem("refresh_token");
             window.location.href = "/login";
           });
        } else {
          return fromPromise(
            new Promise(resolve => {
              pendingRequests.push(resolve);
            })
          ).flatMap(() => {
            const newToken = localStorage.getItem("access_token");
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ${newToken}`,
              },
            });
            return forward(operation);
          });
        }
      }
    }
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});
