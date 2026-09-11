// lib/apollo-server.ts
"use server";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { cookies } from "next/headers";
import envconfig from "@/config/envConfig";

export const apolloServer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: envconfig.graphqlApi,
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
  });
};