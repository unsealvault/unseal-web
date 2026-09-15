import { gql } from "@apollo/client";


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
    }
  }
`;
