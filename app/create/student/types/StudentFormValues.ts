import { Staff } from '@/app/search/staff/types/Staff';

export interface StudentFormValues {
  firstName: string;
  lastName: string;
  birthDate: string;
  enrollmentYear: number;
  parentId: string | null;
  classId: string | null;
  classTeacherId: string | null;
  classTeacher: Omit<Staff, 'id' | 'birthDate' | 'position' | 'students'>;
}
