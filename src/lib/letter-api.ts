// src/lib/letter-api.ts
export interface SealLetterInput {
  recipientEmail: string;
  encryptedContent: string;
  deliverAt: string;
  audience: string;
  visibility: string;
  authorName: string;
  images: string[];
  audio: string[];
  videos: string[];
  files: string[];
}


export interface SealLetterResponse {
  id: string;
  recipientEmail: string;
  status: string;
  deliverAt: string;
}

const SEAL_LETTER_MUTATION = `
  mutation SealLetter($input: CreateLetterInput!) {
    sealLetter(input: $input) {
      id
      recipientEmail
      status
      deliverAt
    }
  }
`;

export async function submitSealedLetter(
  payload: SealLetterInput
): Promise<SealLetterResponse> {
  const graphqlEndpoint =
    process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4001/graphql';

  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: SEAL_LETTER_MUTATION,
      variables: { input: payload },
    }),
  });

  const resData = await response.json();

  if (resData.errors && resData.errors.length > 0) {
    throw new Error(resData.errors[0].message);
  }

  return resData.data?.sealLetter;
}