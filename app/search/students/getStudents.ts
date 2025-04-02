import { axiosInstance } from '@/app/page';
import { AxiosResponse } from 'axios';
import { Student } from './types/Student';
import { Handbook } from '@/types/handbook';

export interface StudentSearchParams {
  search?: string;
  firstName: Handbook | null;
  lastName: Handbook | null;
  birthDate: Handbook | null;
  enrollmentYear: Handbook | null;
}

export const getStudents = async (searchParams: StudentSearchParams) => {
  const { data } = await axiosInstance.get<unknown, AxiosResponse<Student[]>>('/students', {
    params: {
      s: searchParams.search,
      fn: searchParams.firstName?.label,
      ln: searchParams.lastName?.label,
      bd: searchParams.birthDate?.label,
      ey: searchParams.enrollmentYear?.label,
    },
  });

  const studentsFirstNameOptions: Handbook[] = data
    .map(student => ({
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

  return { data: data, filterOptions: studentFilterOptions };
};
