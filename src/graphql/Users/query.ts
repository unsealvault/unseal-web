import { gql } from "@apollo/client";


export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(createUserInput: { name: $name, email: $email }) {
      statusCode
      message
      success
      data {
        _id
        name
        email
      }
    }
  }
`;
