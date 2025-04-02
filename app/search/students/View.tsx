'use client';

import { SearchGroup } from '@/app/components/SearchGroup';

import { FC, useState } from 'react';
import { Student } from './types/Student';
import { SelectAsync } from '@/app/components/SelectAsync';
import { getStudents } from './getStudents';
import { Handbook } from '@/types/handbook';
import { StudentFilterOptions } from './types/StudentFilterOptions';
import classes from './View.module.css';

interface SelectedStudent {
  firstName: Handbook | null;
  lastName: Handbook | null;
  birthDate: Handbook | null;
  enrollmentYear: Handbook | null;
}

interface ViewProps {
  data: Student[];
}
export const View: FC<ViewProps> = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<SelectedStudent>({
    firstName: null,
    lastName: null,
    birthDate: null,
    enrollmentYear: null,
  });

  const [filterOptions, setFilterOptions] = useState<StudentFilterOptions>({
    studentsBirthDateOptions: [],
    studentsEnrollmentYearOptions: [],
    studentsFirstNameOptions: [],
    studentsLastNameOptions: [],
  });

  return (
    <div className="mt-10 mx-10 flex gap-10">
      <SearchGroup value={searchValue} onChange={setSearchValue} onSubmit={() => {}} />

      <div className="flex w-full gap-3">
        <SelectAsync
          className="w-full"
          classNames={{
            input: classes.selectInput,
            dropdown: classes.selectDropdown,
            option: classes.selectOption,
          }}
          placeholder="Имя ученика"
          options={filterOptions.studentsFirstNameOptions}
          fetchData={async () => {
            const { filterOptions } = await getStudents({
              ...selectedFilters,
              firstName: null,
            });
            setFilterOptions(filterOptions);
          }}
          value={selectedFilters.firstName}
          onChange={item => setSelectedFilters(prev => ({ ...prev, firstName: item }))}
        />
        <SelectAsync
          className="w-full"
          classNames={{
            input: classes.selectInput,
            dropdown: classes.selectDropdown,
            option: classes.selectOption,
          }}
          placeholder="Фамилия ученика"
          options={filterOptions.studentsLastNameOptions}
          fetchData={async () => {
            const { filterOptions } = await getStudents({
              ...selectedFilters,
              lastName: null,
            });
            setFilterOptions(filterOptions);
          }}
          value={selectedFilters.lastName}
          onChange={item => setSelectedFilters(prev => ({ ...prev, lastName: item }))}
        />

        <SelectAsync
          className="w-full"
          classNames={{
            input: classes.selectInput,
            dropdown: classes.selectDropdown,
            option: classes.selectOption,
          }}
          placeholder="Дата рождения"
          options={filterOptions.studentsBirthDateOptions}
          fetchData={async () => {
            const { filterOptions } = await getStudents({
              ...selectedFilters,
            });
            setFilterOptions(filterOptions);
          }}
          value={selectedFilters.birthDate}
          onChange={item => setSelectedFilters(prev => ({ ...prev, birthDate: item }))}
        />

        <SelectAsync
          className="w-full"
          classNames={{
            input: classes.selectInput,
            dropdown: classes.selectDropdown,
            option: classes.selectOption,
          }}
          placeholder="Год поступления"
          options={filterOptions.studentsEnrollmentYearOptions}
          fetchData={async () => {
            const { filterOptions } = await getStudents({
              ...selectedFilters,
            });
            setFilterOptions(filterOptions);
          }}
          value={selectedFilters.enrollmentYear}
          onChange={item => setSelectedFilters(prev => ({ ...prev, enrollmentYear: item }))}
        />
      </div>
    </div>
  );
};
