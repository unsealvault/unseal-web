// lib/apollo-client.ts
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import envconfig from "../config/envConfig";

const httpLink = new HttpLink({
  uri: envconfig.graphqlApi,
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
