import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useStaffDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-staff'],
    mutationFn: async (id: string) => await axios.delete('/api/staff', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['staff'] }),
  });
};
