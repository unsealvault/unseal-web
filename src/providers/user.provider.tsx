/* eslint-disable no-console */
"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../types";
import { getCurrentUser } from "../graphql/hooks/auth.hook";

interface IUserProviderValues {
  name: string;
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  refetchUser: () => void;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  // get user from graphql hook
  const { user: currentUser, isLoading, refetchMe } = getCurrentUser();

  useEffect(() => {
    // 1. isLoading end & user data exists (logged in)
    if (!isLoading && currentUser) {
      setUser(currentUser);
    }
    // 2. isLoading end & no user data (logged out or not logged in)
    else if (!isLoading && !currentUser) {
      setUser(null);
    }
  }, [currentUser, isLoading]);

  return (
    <UserContext.Provider
      value={{
        name: user?.name || "",
        user,
        setUser,
        isLoading,
        refetchUser: refetchMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }
  return context;
};

export default UserProvider;