import { Student } from '../../students/types/Student';

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  birthDate: string;
  phoneNumber: string;
  childrens: Student[];
}
