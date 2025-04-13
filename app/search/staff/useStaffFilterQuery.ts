import axios, { AxiosResponse } from 'axios';
import { Handbook } from '@/types/handbook';
import { useQuery } from '@tanstack/react-query';
import { Staff } from './types/Staff';

export interface StaffFilterSearchParams {
  firstName: Handbook | null;
  lastName: Handbook | null;
  birthDate: Handbook | null;
  position: Handbook | null;
}

export const useStaffFilterQuery = (searchParams?: StaffFilterSearchParams) => {
  const { data, ...rest } = useQuery<Staff[]>({
    queryKey: [
      'staff',
      searchParams?.lastName,
      searchParams?.birthDate,
      searchParams?.firstName,
      searchParams?.position,
    ],
    queryFn: async (): Promise<Staff[]> => {
      const response = await axios.get<unknown, AxiosResponse<Staff[]>>(`/api/staff`, {
        params: {
          fn: searchParams?.firstName?.label,
          ln: searchParams?.lastName?.label,
          bd: searchParams?.birthDate?.label,
          p: searchParams?.position?.label,
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
        staffBirthDateOptions: [],
        staffPositionOptions: [],
        staffFirstNameOptions: [],
        staffLastNameOptions: [],
        staffClassTeacherOptions: [],
      },
      ...rest,
    };
  }

  const staffFirstNameOptions: Handbook[] = data
    ?.map(staff => ({
      value: staff.id,
      label: staff.firstName,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const staffLastNameOptions: Handbook[] = data
    .map(staff => ({
      value: staff.id,
      label: staff.lastName,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const staffBirthDateOptions: Handbook[] = data
    .map(staff => ({
      value: staff.id,
      label: staff.birthDate,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const staffPositionOptions: Handbook[] = data
    .map(staff => ({
      value: staff.id,
      label: staff.position,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const staffClassTeacherOptions: Handbook[] = data
    .filter(item => item.isClassTeacher === true)
    .map(staff => ({
      value: staff.id,
      label: `${staff.lastName} ${staff.firstName}`,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const staffFilterOptions = {
    staffFirstNameOptions,
    staffLastNameOptions,
    staffPositionOptions,
    staffBirthDateOptions,
    staffClassTeacherOptions,
  };

  return { data: data, filterOptions: staffFilterOptions, ...rest };
};
