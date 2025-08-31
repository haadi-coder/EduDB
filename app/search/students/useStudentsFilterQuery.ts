import axios, { AxiosResponse } from 'axios';
import { Student } from './types/Student';
import { Handbook } from '@/types/handbook';
import { useQuery } from '@tanstack/react-query';

export interface StudentFilterSearchParams {
  firstName: Handbook | null;
  lastName: Handbook | null;
  birthYear: Handbook | null;
  enrollmentYear: Handbook | null;
  parentId: Handbook | null;
  classTeacherId: Handbook | null;
}

export const useStudentsFilterQuery = (searchParams?: StudentFilterSearchParams) => {
  const { data, ...rest } = useQuery<Student[]>({
    queryKey: [
      'students',
      searchParams?.lastName,
      searchParams?.birthYear,
      searchParams?.firstName,
      searchParams?.enrollmentYear,
      searchParams?.parentId,
      searchParams?.classTeacherId,
    ],
    queryFn: async (): Promise<Student[]> => {
      const response = await axios.get<unknown, AxiosResponse<Student[]>>(`/api/students`, {
        params: {
          fn: searchParams?.firstName?.label,
          ln: searchParams?.lastName?.label,
          by: searchParams?.birthYear?.label,
          ey: searchParams?.enrollmentYear?.label,
          pi: searchParams?.parentId?.value,
          ci: searchParams?.classTeacherId?.value,
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
        studentsBirthYearOptions: [],
        studentsEnrollmentYearOptions: [],
        studentsFirstNameOptions: [],
        studentsLastNameOptions: [],
        studentsOptions: [],
        studentParentOptions: [],
        studentClassTeacherOptions: [],
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

  const studentsBirthYearOptions: Handbook[] = data
    .map(student => ({
      value: student.id,
      label: student.birthDate.split('.')[2],
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label))
    .sort((a, b) => a.label.localeCompare(b.label));

  const studentsEnrollmentYearOptions: Handbook[] = data
    .map(student => ({
      value: student.id,
      label: student.enrollmentYear.toString(),
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label))
    .sort((a, b) => a.label.localeCompare(b.label));

  const studentsOptions: Handbook[] = data
    .map(student => ({
      value: student.id,
      label: `${student.lastName} ${student.firstName}`,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label))
    .sort((a, b) => a.label.localeCompare(b.label));

  const studentParentOptions: Handbook[] = data
    .map(student => ({
      value: student.parent?.id || '',
      label: `${student.parent?.lastName} ${student.parent?.firstName}`,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

  const studentClassTeacherOptions: Handbook[] = data
    .map(student => ({
      value: student.classTeacher?.id || '',
      label: `${student.classTeacher?.lastName} ${student.classTeacher?.firstName}`,
    }))
    .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label))
    .filter(item => item.label !== 'undefined undefined')
    .sort((a, b) => a.label.localeCompare(b.label));

  const studentFilterOptions = {
    studentsFirstNameOptions,
    studentsLastNameOptions,
    studentsEnrollmentYearOptions,
    studentsBirthYearOptions,
    studentsOptions,
    studentParentOptions,
    studentClassTeacherOptions,
  };

  return { data: data, filterOptions: studentFilterOptions, ...rest };
};
