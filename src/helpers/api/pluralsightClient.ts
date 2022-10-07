import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

// const httpLink = new HttpLink({
//   uri: "https://paas-api.pluralsight.com/graphql",
// });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_PLURALSIGHT_TOKEN}`,
    },
  });

  return forward(operation);
});

const pluralsightClient = new ApolloClient({
  link: concat(
    authMiddleware,
    new HttpLink({
      uri: "https://paas-api.pluralsight.com/graphql",
    })
  ),
  cache: new InMemoryCache(),
});

export {pluralsightClient}