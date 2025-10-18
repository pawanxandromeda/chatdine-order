// src/hooks/useMenu.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getMenuItemsApi,
  createMenuItemApi,
  updateMenuItemApi,
  deleteMenuItemApi,
  toggleFeaturedApi,
  toggleAvailableApi,
} from '../api/menuApi';

// ----------------------------
// Fetch all menu items
// ----------------------------
export const useMenuItems = () => {
  return useQuery({
    queryKey: ['menuItems'],
    queryFn: getMenuItemsApi,
  });
};

// ----------------------------
// Create menu item
// ----------------------------
export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMenuItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu Item Created 🎉', {
        description: 'The menu item was created successfully.',
      });
    },
    onError: (error: any) => {
      toast.error('Create Failed ❌', {
        description: error?.message || 'Failed to create menu item.',
      });
    },
  });
};

// ----------------------------
// Update menu item
// ----------------------------
export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateMenuItemApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu Item Updated ✏️', {
        description: 'The menu item was updated successfully.',
      });
    },
    onError: (error: any) => {
      toast.error('Update Failed ⚠️', {
        description: error?.message || 'Failed to update menu item.',
      });
    },
  });
};

// ----------------------------
// Delete menu item
// ----------------------------
export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMenuItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu Item Deleted 🗑️', {
        description: 'The menu item was deleted successfully.',
      });
    },
    onError: (error: any) => {
      toast.error('Delete Failed ❌', {
        description: error?.message || 'Failed to delete menu item.',
      });
    },
  });
};

// ----------------------------
// Toggle "Featured" status
// ----------------------------
export const useToggleFeatured = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFeaturedApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Featured Status Updated 🌟', {
        description: 'Menu item featured status updated successfully.',
      });
    },
    onError: (error: any) => {
      toast.error('Feature Toggle Failed ⚠️', {
        description: error?.message || 'Failed to update featured status.',
      });
    },
  });
};

// ----------------------------
// Toggle "Available" status
// ----------------------------
export const useToggleAvailable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, available }: { id: string; available: boolean }) =>
      toggleAvailableApi(id, available),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Availability Updated ✅', {
        description: 'Menu item availability updated successfully.',
      });
    },
    onError: (error: any) => {
      toast.error('Availability Toggle Failed ⚠️', {
        description: error?.message || 'Failed to update availability.',
      });
    },
  });
};
