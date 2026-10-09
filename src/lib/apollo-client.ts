// lib/apollo-client.ts
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import envconfig from "../config/envConfig";

const httpLink = new HttpLink({
  uri: envconfig.graphqlApi,
  credentials: "include", // কুকি পাস করার জন্য অত্যন্ত জরুরি[cite: 2]
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only", // সেশন চেকের সময় ক্লায়েন্ট ক্যাশ এড়াতে
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});