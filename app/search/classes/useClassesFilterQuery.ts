import { useQuery } from '@tanstack/react-query';
import { Class } from './types/Class';
import axios, { AxiosResponse } from 'axios';
import { Handbook } from '@/types/handbook';

export const useClassesFilterQuery = () => {
  const { data, ...rest } = useQuery<Class[]>({
    queryKey: ['classes'],
    queryFn: async (): Promise<Class[]> => {
      const resposne = await axios.get<unknown, AxiosResponse<Class[]>>('/api/classes');
      return resposne.data;
    },
  });

  if (!data) {
    return {
      data: [],
      filterOptions: {
        classesNames: [],
      },
    };
  }

  const classesNames: Handbook[] = data
    ?.map(item => ({ value: item.id, label: item.name }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label))
    .sort((a, b) => a.label.localeCompare(b.label));

  const classesFilterOptions = { classesNames };

  return { data, filterOptions: classesFilterOptions, ...rest };
};
