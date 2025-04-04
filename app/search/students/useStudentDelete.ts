import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useStudentDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-student'],
    mutationFn: async (id: string) => await axios.delete('/api/students', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });
};
