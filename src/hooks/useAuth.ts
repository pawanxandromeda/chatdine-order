// src/hooks/useAuthHooks.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signupApi, loginApi, googleSignInApi, AuthResponse } from '../api/authApi';
import { User } from '../atoms/userAtom';
import { toast } from 'sonner';
import { useProperAuth } from '../auth/ProperAuthProvider'; // ✅ Import context

// ✅ Signup hook
export const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser, setAccessToken } = useProperAuth(); // ✅ Context setters

  return useMutation<AuthResponse, any, any>({
    mutationFn: signupApi,
    onSuccess: (data) => {
      // ✅ Set global auth state
      setUser(data.user);
      setAccessToken(data.accessToken);

      // ✅ Cache user for react-query
      queryClient.setQueryData(['user'], data.user);

      // ✅ Save refresh token separately
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      toast.success('Signup Successful 🎉', {
        description: 'You have signed up successfully.',
      });

      navigate('/admin');
    },
    onError: (error: any) => {
      toast.error('Signup Failed ❌', {
        description: error?.message || 'An error occurred during signup.',
      });
      console.error('Signup error:', error);
    },
  });
};

// ✅ Login hook
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser, setAccessToken } = useProperAuth();

  return useMutation<AuthResponse, any, any>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);

      queryClient.setQueryData(['user'], data.user);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
 

      toast.success('Login Successful 🎯', {
        description: 'You have logged in successfully.',
      });

      navigate('/admin');
    },
    onError: (error: any) => {
      toast.error('Login Failed ⚠️', {
        description: error?.message || 'An error occurred during login.',
      });
      console.error('Login error:', error);
    },
  });
};

// ✅ Google Sign-In hook
export const useGoogleSignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser, setAccessToken } = useProperAuth();

  return useMutation<AuthResponse, any, any>({
    mutationFn: googleSignInApi,
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);

      queryClient.setQueryData(['user'], data.user);
      localStorage.setItem('refreshToken', data.refreshToken);

      toast.success('Google Sign-In Successful 🚀', {
        description: 'You have signed in with Google successfully.',
      });

      navigate('/admin');
    },
    onError: (error: any) => {
      toast.error('Google Sign-In Failed 😞', {
        description: error?.message || 'An error occurred during Google Sign-In.',
      });
      console.error('Google SignIn error:', error);
    },
  });
};

// ✅ Get current auth user
export const useAuthUser = () => {
  return useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
    initialData: null,
  });
};
