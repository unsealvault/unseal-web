"use client";

import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "@/components/theme-provider";
import { apolloClient } from "@/lib/apollo-client";
import { ReactNode } from "react";
import UserProvider from "./user.provider";
import { Toaster } from "sonner";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ApolloProvider client={apolloClient}>
        <UserProvider>
          <Toaster richColors />
          {children}
        </UserProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};