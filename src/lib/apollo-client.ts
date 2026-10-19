import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://api.unsealme.com/graphql', // আপনার ব্যাকএন্ড GraphQL URL
  credentials: 'include',                 // কুকি পাস করার জন্য এটি থাকতেই হবে
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});