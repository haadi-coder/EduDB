import { Student } from '../../students/types/Student';

export interface Class {
  id: string;
  name: string;
  capacity: number;
  students: Student[];
}
