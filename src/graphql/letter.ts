import { UserLetter } from "@/types";
import { gql } from "@apollo/client";

export interface GetMyLetterByIdResponse {
  getMyLetterById: UserLetter | null;
}

export interface GetMyLetterByIdVariables {
  id: string;
}

export const SEAL_LETTER_MUTATION = gql`
  mutation SealDirectLetter($input: CreateLetterInput!) {
    sealLetter(input: $input) {
      userId
      recipientEmail
      encryptedContent
      deliverAt
      audience
      visibility
      authorName 
      images
      audio
      videos
      files
      paymentId
    }
  }
`;


export const GET_MY_LETTERS_QUERY = gql`
  query GetMyVaultLetters {
    myLetters {
      _id
      recipientEmail
      encryptedContent
      status
      deliverAt
      createdAt
      audience
      visibility
      authorName
      images
      audio
      videos
      files
      paymentId
    }
  }
`;

export const GET_MY_LETTER_BY_ID = gql`
  query GetMyLetterById($id: String!) {
    getMyLetterById(_id: $id) {
      _id
      audience
      audio
      authorName
      createdAt
      deliverAt
      encryptedContent
      files
      images
      recipientEmail
      status
      userId
      videos
      visibility
      paymentId
    }
  }
`;
