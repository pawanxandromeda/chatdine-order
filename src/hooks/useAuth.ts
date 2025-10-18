import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signupApi, loginApi, googleSignInApi, AuthResponse } from '../api/authApi';
import { User } from '../atoms/userAtom';
import { toast } from 'sonner';

// ✅ Signup hook
export const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, any, any>({
    mutationFn: signupApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // ✅ Sonner toast
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

  return useMutation<AuthResponse, any, any>({
    mutationFn: loginApi,
    onSuccess: (data) => {
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

  return useMutation<AuthResponse, any, any>({
    mutationFn: googleSignInApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      localStorage.setItem('accessToken', data.accessToken);
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
      const accessToken = localStorage.getItem('accessToken');
      const user = accessToken ? JSON.parse(localStorage.getItem('user') || 'null') : null;
      return user;
    },
    initialData: null,
  });
};
