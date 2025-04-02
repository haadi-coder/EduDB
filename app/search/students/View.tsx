'use client';

import { SearchGroup } from '@/app/components/SearchGroup';

import { FC, useState } from 'react';
import { Student } from './types/Student';
import { SelectAsync } from '@/app/components/SelectAsync';
import { getStudents } from './getStudents';
import { Handbook } from '@/types/handbook';
import { StudentFilterOptions } from './types/StudentFilterOptions';
import classes from './View.module.css';
import StudentsTable from '@/app/components/StudentsTable/StudentsTable';
import { Center, Text } from '@mantine/core';

interface SelectedFilters {
  firstName: Handbook | null;
  lastName: Handbook | null;
  birthDate: Handbook | null;
  enrollmentYear: Handbook | null;
}

interface ViewProps {
  data: Student[];
}
export const View: FC<ViewProps> = ({ data }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
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

  const [students, setStudents] = useState<Student[]>(data);

  return (
    <div className="mt-20 mx-10 ">
      <div className="flex gap-10">
        <SearchGroup
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={async () => {
            const { data } = await getStudents({
              ...selectedFilters,
              search: searchValue,
            });
            setStudents(data);
          }}
        />

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
            fetchOptions={async () => {
              const { filterOptions } = await getStudents({
                ...selectedFilters,
                firstName: null,
              });
              setFilterOptions(filterOptions);
            }}
            value={selectedFilters.firstName}
            onChange={async item => {
              setSelectedFilters(prev => ({ ...prev, firstName: item }));
            }}
            fetchData={async () => {
              const { data } = await getStudents({
                ...selectedFilters,
              });
              setStudents(data);
            }}
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
            fetchOptions={async () => {
              const { filterOptions } = await getStudents({
                ...selectedFilters,
                lastName: null,
              });
              setFilterOptions(filterOptions);
            }}
            value={selectedFilters.lastName}
            onChange={item => setSelectedFilters(prev => ({ ...prev, lastName: item }))}
            fetchData={async () => {
              const { data } = await getStudents({
                ...selectedFilters,
              });
              setStudents(data);
            }}
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
            fetchOptions={async () => {
              const { filterOptions } = await getStudents({
                ...selectedFilters,
                birthDate: null,
              });
              setFilterOptions(filterOptions);
            }}
            value={selectedFilters.birthDate}
            onChange={item => setSelectedFilters(prev => ({ ...prev, birthDate: item }))}
            fetchData={async () => {
              const { data } = await getStudents({
                ...selectedFilters,
              });
              setStudents(data);
            }}
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
            fetchOptions={async () => {
              const { filterOptions } = await getStudents({
                ...selectedFilters,
                enrollmentYear: null,
              });
              setFilterOptions(filterOptions);
            }}
            value={selectedFilters.enrollmentYear}
            onChange={item => setSelectedFilters(prev => ({ ...prev, enrollmentYear: item }))}
            fetchData={async () => {
              const { data } = await getStudents({
                ...selectedFilters,
              });
              setStudents(data);
            }}
          />
        </div>
      </div>

      {students.length === 0 ? <Center h='30vh'><Text fz={20}>Ничего не найдено</Text> </Center>  : <StudentsTable data={students} />}
    </div>
  );
};
