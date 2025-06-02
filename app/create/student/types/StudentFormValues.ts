import { Parent } from '@/app/search/parents/types/Parent';
import { Staff } from '@/app/search/staff/types/Staff';

export interface StudentFormValues {
  firstName: string;
  lastName: string;
  birthDate: string | null;
  enrollmentYear: number;
  parentId: string | null;
  parent: Omit<Parent, 'id' | 'role' | 'birthDate' | 'phoneNumber' | 'childrens'>;
  classId: string | null;
  classTeacherId: string | null;
  classTeacher: Omit<Staff, 'id' | 'birthDate' | 'position' | 'students'>;
}
