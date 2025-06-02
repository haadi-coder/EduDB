import { Staff } from '@prisma/client';
import { Parent } from '../../parents/types/Parent';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  enrollmentYear: number;
  parent?: Parent;
  classTeacher?:Staff
}
