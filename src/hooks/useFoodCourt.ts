// src/hooks/useFoodCourt.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getFoodCourtsApi,
  getJoinableFoodCourtsApi,
  joinFoodCourtApi,
  leaveFoodCourtApi,
  getMyFoodCourtApi,
  createFoodCourtApi,
  getFoodCourtApi,
} from '../api/foodCourtApi';

// ----------------------------
// Fetch all food courts
// ----------------------------
export const useFoodCourts = () => {
  return useQuery({
    queryKey: ['foodCourts'],
    queryFn: getFoodCourtsApi,
  });
};

// ----------------------------
// Fetch specific food court
// ----------------------------
export const useFoodCourt = (id: string) => {
  return useQuery({
    queryKey: ['foodCourt', id],
    queryFn: () => getFoodCourtApi(id),
    enabled: !!id,
  });
};

// ----------------------------
// Fetch current user's food court
// ----------------------------
export const useMyFoodCourt = () => {
  return useQuery({
    queryKey: ['myFoodCourt'],
    queryFn: getMyFoodCourtApi,
  });
};

// ----------------------------
// Fetch joinable food courts
// ----------------------------
export const useJoinableFoodCourts = () => {
  return useQuery({
    queryKey: ['joinableFoodCourts'],
    queryFn: getJoinableFoodCourtsApi,
  });
};

// ----------------------------
// Join a food court
// ----------------------------
export const useJoinFoodCourt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinFoodCourtApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['myFoodCourt'] });
      queryClient.invalidateQueries({ queryKey: ['joinableFoodCourts'] });
      toast.success(`You've joined ${data.name} food court`);
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to join food court');
    },
  });
};

// ----------------------------
// Leave food court
// ----------------------------
export const useLeaveFoodCourt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveFoodCourtApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myFoodCourt'] });
      queryClient.invalidateQueries({ queryKey: ['joinableFoodCourts'] });
      toast.success('You have successfully left the food court');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to leave food court');
    },
  });
};

// ----------------------------
// Create food court (admin)
// ----------------------------
export const useCreateFoodCourt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFoodCourtApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['foodCourts'] });
      toast.success(`${data.name} has been created successfully`);
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create food court');
    },
  });
};