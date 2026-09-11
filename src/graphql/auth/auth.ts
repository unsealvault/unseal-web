
import { graphqlRequest } from "@/lib/gqlClient";
import { RegisterResponse } from "@/types/auth";
import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = `
  mutation Register($input: SignUpInput!) {
    signUp(input: $input) {
      statusCode
      success
      message
      accessToken
      refreshToken
      user {
        _id
        email
        role
        status
      }
    }
  }
`;


export const LOGIN_MUTATION = `
mutation login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    statusCode
    success
    message
    accessToken
    refreshToken
    user { 
     _id
    }
  }
}
`;


export const GET_ME = gql`
  query GetMe {
  me {
     _id
    name
    email
    role 
  }
}
`;


export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<RegisterResponse> => {

  return graphqlRequest(
    SIGN_UP_MUTATION,
    {
      input: {
       name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      },
    },
  );
};

export const loginUser = async (email: string, password: string) => {
  return graphqlRequest(LOGIN_MUTATION, {
    loginInput: { email, password },
  });
};




