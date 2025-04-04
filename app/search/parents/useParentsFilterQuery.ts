import { Handbook } from '@/types/handbook';
import { useQuery } from '@tanstack/react-query';
import { Parent } from './types/Parent';
import axios, { AxiosResponse } from 'axios';

export interface ParentsFilterSearchParams {
  firstName: Handbook | null;
  lastName: Handbook | null;
  birthDate: Handbook | null;
  role: Handbook | null;
}

export const useParentFilterQuery = (searchParams: ParentsFilterSearchParams) => {
  const { data, ...rest } = useQuery<Parent[]>({
    queryKey: [
      'parents',
      searchParams.lastName,
      searchParams.birthDate,
      searchParams.firstName,
      searchParams.role,
    ],
    queryFn: async (): Promise<Parent[]> => {
      const response = await axios.get<unknown, AxiosResponse<Parent[]>>(`/api/parents`, {
        params: {
          fn: searchParams.firstName?.label,
          ln: searchParams.lastName?.label,
          bd: searchParams.birthDate?.label,
          r: searchParams.role?.label,
        },
      });

      return response.data;
    },
    // placeholderData: keepPreviousData, // это стоит влючить если хочется загрузки без моргания на loader
  });

  if (!data) {
    return {
      data: [],
      filterOptions: {
        parentsBirthDateOptions: [],
        parentsRoleOptions: [],
        parentsFirstNameOptions: [],
        parentsLastNameOptions: [],
      },
      ...rest,
    };
  }

  const parentsFirstNameOptions: Handbook[] = data
    ?.map(parent => ({
      value: parent.id,
      label: parent.firstName,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const parentsLastNameOptions: Handbook[] = data
    .map(parent => ({
      value: parent.id,
      label: parent.lastName,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const parentsBirthDateOptions: Handbook[] = data
    .map(parent => ({
      value: parent.id,
      label: parent.birthDate,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const parentsRoleOptions: Handbook[] = data
    .map(parent => ({
      value: parent.id,
      label: parent.role,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const parentsFilterOptions = {
    parentsFirstNameOptions,
    parentsLastNameOptions,
    parentsRoleOptions,
    parentsBirthDateOptions,
  };

  return { data: data, filterOptions: parentsFilterOptions, ...rest };
};
