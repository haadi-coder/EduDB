import { Student } from '../../students/types/Student';

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  position: string;
  isClassTeacher: string;
  students: Student[];
}
