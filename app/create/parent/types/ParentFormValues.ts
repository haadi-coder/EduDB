import { Student } from '@/app/search/students/types/Student';

export interface ParentFormValues {
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  birthDate: string | null;
  childrenIds: Record<string, string>[];
  child: Omit<Student, 'id'>;
}
