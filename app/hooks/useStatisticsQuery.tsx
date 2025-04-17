import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Statistics } from '../types/Statistics';

export const useStatisticsQuery = () => {
  return useQuery<Statistics>({
    queryKey: ['statistics'],
    queryFn: async () => {
      const response = await axios.get('/api/statistics');
      return response.data;
    },
  });
};
