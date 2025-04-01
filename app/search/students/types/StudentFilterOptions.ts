import { Handbook } from '@/types/handbook';

export interface StudentFilterOptions {
  studentsFirstNameOptions: Handbook[];
  studentsLastNameOptions: Handbook[];
  studentsEnrollmentYearOptions: Handbook[];
  studentsBirthDateOptions: Handbook[];
}
