"use client";

 
import { SEAL_LETTER_MUTATION } from "@/graphql/letter";
import { SealLetterData } from "@/types";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner"; 


export const useSealLetter = () => {
  // 👈 এখানে <SealLetterData, any> যোগ করুন
  const [sealLetterMutation, { loading: isLoading }] = useMutation<SealLetterData, any>(
    SEAL_LETTER_MUTATION
  );

  const sealLetter = async (inputData: any) => {
    try {
      const response = await sealLetterMutation({
        variables: { input: inputData },
      });

      // ✅ এবার TypeScript চিনতে পারবে এবং এরর চলে যাবে
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