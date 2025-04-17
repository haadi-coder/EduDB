export interface Statistics {
  parentsCount: number;
  staffCount: number;
  studentsCount: number;
  studentsCountByAgeGroups: Record<string, number>;
  studentsCountByClasses: StudentsCountByClasses[];
}

export interface StudentsCountByClasses {
  className: string;
  count: number;
}
