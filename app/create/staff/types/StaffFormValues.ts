export interface StaffFormValues {
  firstName: string;
  lastName: string;
  position: string;
  birthDate: string | null;
  isClassTeacher: boolean;
  studentIds: string[];
}
