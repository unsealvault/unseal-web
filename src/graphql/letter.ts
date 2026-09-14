import { graphqlRequest } from "@/lib/gqlClient";
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


export interface SealLetterInput {
  userId: string;
  recipientEmail: string;
  encryptedContent: string;
  deliverAt: string;
  audience?: 'self' | 'someone_else';
  visibility?: 'private' | 'public_anonymous';
  authorName?: string;
  images?: string[];
  audio?: string[];
  videos?: string[];
  files?: string[];
}

