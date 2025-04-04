import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useParentDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-parent'],
    mutationFn: async (id: string) => await axios.delete('/api/parents', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['parents'] }),
  });
};
