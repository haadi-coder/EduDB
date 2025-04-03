import axios, { AxiosResponse } from 'axios';
import { Student } from './types/Student';
import { Handbook } from '@/types/handbook';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export interface StudentFilterSearchParams {
  firstName: Handbook | null;
  lastName: Handbook | null;
  birthDate: Handbook | null;
  enrollmentYear: Handbook | null;
}

// export const getStudents = async (searchParams: StudentSearchParams) => {
//   const { data } = await axios.get<unknown, AxiosResponse<Student[]>>(
//     `http://localhost:3000/api/students`,
//     {
//       params: {
//         s: searchParams.search,
//         fn: searchParams.firstName?.label,
//         ln: searchParams.lastName?.label,
//         bd: searchParams.birthDate?.label,
//         ey: searchParams.enrollmentYear?.label,
//       },
//     },
//   );

//   const studentsFirstNameOptions: Handbook[] = data
//     .map(student => ({
//       value: student.id,
//       label: student.firstName,
//     }))
//     .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

//   const studentsLastNameOptions: Handbook[] = data
//     .map(student => ({
//       value: student.id,
//       label: student.lastName,
//     }))
//     .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

//   const studentsBirthDateOptions: Handbook[] = data
//     .map(student => ({
//       value: student.id,
//       label: student.birthDate,
//     }))
//     .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

//   const studentsEnrollmentYearOptions: Handbook[] = data
//     .map(student => ({
//       value: student.id,
//       label: student.enrollmentYear.toString(),
//     }))
//     .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label));

//   const studentFilterOptions = {
//     studentsFirstNameOptions,
//     studentsLastNameOptions,
//     studentsEnrollmentYearOptions,
//     studentsBirthDateOptions,
//   };

//   return { data: data, filterOptions: studentFilterOptions };
// };

export const useStudentsFilterQuery = (searchParams: StudentFilterSearchParams) => {
  const { data, ...rest } = useQuery<Student[]>({
    queryKey: [
      'students',
      searchParams.lastName,
      searchParams.birthDate,
      searchParams.firstName,
      searchParams.enrollmentYear,
    ],
    queryFn: async (): Promise<Student[]> => {
      const response = await axios.get<unknown, AxiosResponse<Student[]>>(`/api/students`, {
        params: {
          fn: searchParams.firstName?.label,
          ln: searchParams.lastName?.label,
          bd: searchParams.birthDate?.label,
          ey: searchParams.enrollmentYear?.label,
        },
      });

      return response.data;
    },
    placeholderData: keepPreviousData, 
  });

  if (!data) {
    return {
      data: [],
      filterOptions: {
        studentsBirthDateOptions: [],
        studentsEnrollmentYearOptions: [],
        studentsFirstNameOptions: [],
        studentsLastNameOptions: [],
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

  const studentFilterOptions = {
    studentsFirstNameOptions,
    studentsLastNameOptions,
    studentsEnrollmentYearOptions,
    studentsBirthDateOptions,
  };

  return { data: data, filterOptions: studentFilterOptions, ...rest };
};
