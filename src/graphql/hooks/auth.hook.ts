import { useState } from 'react';
import { toast } from 'sonner';   
import { useQuery } from "@apollo/client/react";
import { GET_ME, loginUser, registerUser } from '../auth/auth';
import { IUser } from '@/types'; 


export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    try {
      const response: any = await registerUser(name, email, password);

      const signUpData = response?.signUp || response?.data?.signUp;

      if (!signUpData || !signUpData.success) {
        throw new Error(signUpData?.message || 'Registration failed.');
      }

      toast.success(signUpData.message || 'Account created successfully!');
      return signUpData;
    } catch (err: any) {
      const message = err?.message || 'Registration failed!';
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};



export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => { 
    
    try {
      const result = await loginUser(email, password); 
      console.log("Login result:", result.login.message);
      toast.success(result?.login?.message,);
      return result; 
    } catch (err: any) {
      const message = err.message || "Login failed!";
      toast.error(message,);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }; 

  return { login, isLoading };
};



export const getCurrentUser = () => {
  const { data, loading, error, refetch } = useQuery<{ me: IUser }>(GET_ME,{
    fetchPolicy: "network-only", 
  });

  const userData = data?.me || null;
  // console.log("use data from graphql hook-:", userData);
  return {
    user: userData,      
    isLoading: loading,  
    error: error,     
    refetchMe: refetch, 
  };
};