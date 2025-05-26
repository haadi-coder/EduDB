import axios, { AxiosResponse } from 'axios';
import { Student } from './types/Student';
import { Handbook } from '@/types/handbook';
import { useQuery } from '@tanstack/react-query';

export interface StudentFilterSearchParams {
  firstName: Handbook | null;
  lastName: Handbook | null;
  birthDate: Handbook | null;
  enrollmentYear: Handbook | null;
  parentId: Handbook | null;
}

export const useStudentsFilterQuery = (searchParams?: StudentFilterSearchParams) => {
  const { data, ...rest } = useQuery<Student[]>({
    queryKey: [
      'students',
      searchParams?.lastName,
      searchParams?.birthDate,
      searchParams?.firstName,
      searchParams?.enrollmentYear,
      searchParams?.parentId,
    ],
    queryFn: async (): Promise<Student[]> => {
      const response = await axios.get<unknown, AxiosResponse<Student[]>>(`/api/students`, {
        params: {
          fn: searchParams?.firstName?.label,
          ln: searchParams?.lastName?.label,
          bd: searchParams?.birthDate?.label,
          ey: searchParams?.enrollmentYear?.label,
          pi: searchParams?.parentId?.value,
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
        studentsBirthDateOptions: [],
        studentsEnrollmentYearOptions: [],
        studentsFirstNameOptions: [],
        studentsLastNameOptions: [],
        studentsOptions: [],
        studentParentOptions: [],
      },
      ...rest,
    };
  }

  const studentsFirstNameOptions: Handbook[] = data
    ?.map(student => ({
      value: student.id,
      label: student.firstName,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const studentsLastNameOptions: Handbook[] = data
    .map(student => ({
      value: student.id,
      label: student.lastName,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const studentsBirthDateOptions: Handbook[] = data
    .map(student => ({
      value: student.id,
      label: student.birthDate,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const studentsEnrollmentYearOptions: Handbook[] = data
    .map(student => ({
      value: student.id,
      label: student.enrollmentYear.toString(),
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const studentsOptions: Handbook[] = data
    .map(student => ({
      value: student.id,
      label: `${student.lastName} ${student.firstName}`,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const studentParentOptions: Handbook[] = data
    .map(student => ({
      value: student.parent?.id || '',
      label: `${student.parent?.lastName} ${student.parent?.firstName}`,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const studentFilterOptions = {
    studentsFirstNameOptions,
    studentsLastNameOptions,
    studentsEnrollmentYearOptions,
    studentsBirthDateOptions,
    studentsOptions,
    studentParentOptions,
  };

  return { data: data, filterOptions: studentFilterOptions, ...rest };
};
