import { split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "https://regular-clam-26.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "ycgwBd4DECl1kOFEIhb1ABmKBtte5Wlp4Z1hfpywbQQpXxvnj0LT6HZfE2ZA704f",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://regular-clam-26.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "ycgwBd4DECl1kOFEIhb1ABmKBtte5Wlp4Z1hfpywbQQpXxvnj0LT6HZfE2ZA704f",
      },
    },
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// ...code from the above example goes here...

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
