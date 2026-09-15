"use client";

import { GET_MY_LETTERS_QUERY, SEAL_LETTER_MUTATION } from "@/graphql/letter";
import { SealLetterData, UserLetter } from "@/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { toast } from "sonner"; 


export const useSealLetter = () => {

  const [sealLetterMutation, { loading: isLoading }] = useMutation<SealLetterData, any>(
    SEAL_LETTER_MUTATION
  );

  const sealLetter = async (inputData: any) => {
    try {
      const response = await sealLetterMutation({
        variables: { input: inputData },
      });

      const letter = response.data?.sealLetter;

        console.log("............",letter)
    //   if (!letter?.id) {
    //     throw new Error("Failed to seal letter");
    //   }

      toast.success("Letter sealed into the vault!");
      return letter;
    } catch (err: any) {
      toast.error(err?.message || "Failed to seal letter!");
      throw err;
    }
  };

  return { sealLetter, isLoading };
};

interface MyLettersData {
  myLetters: UserLetter[];
}

export const useMyLetters = () => {
  const { data, loading, error, refetch } = useQuery<MyLettersData>(
    GET_MY_LETTERS_QUERY,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  return {
    letters: data?.myLetters ?? [],
    isLoading: loading,
    error: error?.message || null,
    refetch,
  };
};