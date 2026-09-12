"use server";

import { cookies } from "next/headers";
import { apolloServer } from "../../lib/apollo-server";
import { GET_ME } from "../auth/auth";
import { NextRequest } from "next/server";



type GetMeQuery = {
  me: {
    _id: string;
    name: string;
    email: string;
    role: string;
    profilePhoto?: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export async function getCurrentUser(request: NextRequest) {
  const client = await apolloServer();
  
  const { data } = await client.query<GetMeQuery>({
    query: GET_ME
  });
  
  const userData = data?.me || null; 
  return userData;
}

export async function logout() {
  const cookieStore = cookies();

  (await cookieStore).delete("accessToken");
  (await cookieStore).delete("refreshToken");
}