// 'use client';
// import { Handbook } from '@/types/handbook';
// import React, { FC, useState } from 'react';
// import { useParentFilterQuery } from './useParentsFilterQuery';
// import { useParentDelete } from './useParentDelete';
// import { SelectAsync } from '@/app/components/SelectAsync';
// import { ActionIcon, Center, Loader, Text, Title } from '@mantine/core';
// import { IconReload } from '@tabler/icons-react';
// import ParentsTable from '@/app/components/ParentsTable/ParentsTable';

// interface SelectedFilters {
//   firstName: Handbook | null;
//   lastName: Handbook | null;
//   birthDate: Handbook | null;
//   role: Handbook | null;
// }

// const Parents: FC = () => {
//   const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
//     firstName: null,
//     lastName: null,
//     birthDate: null,
//     role: null,
//   });

//   const { data, refetch, filterOptions, isLoading } = useParentFilterQuery(selectedFilters);
//   const { mutateAsync: deleteParent } = useParentDelete();

//   return (
//     <div className="mt-10 mx-20">
//       <div>
//         <Title mb={30}>Поиск родителя</Title>
//         <div className="flex gap-6">
//           <div className="flex w-full gap-3">
//             <SelectAsync
//               className="w-full"
//               label="Роль"
//               placeholder="Выберите роль в семье..."
//               options={filterOptions.parentsRoleOptions}
//               fetchOptions={async () => {
//                 setSelectedFilters(prev => ({ ...prev, role: null }));
//               }}
//               value={selectedFilters.role}
//               onChange={item => setSelectedFilters(prev => ({ ...prev, role: item }))}
//             />
//             {/* <SelectAsync
//               className="w-full"
//               placeholder="Имя родителя"
//               options={filterOptions.parentsFirstNameOptions}
//               fetchOptions={async () => {
//                 setSelectedFilters(prev => ({ ...prev, firstName: null }));
//               }}
//               value={selectedFilters.firstName}
//               onChange={async item => {
//                 setSelectedFilters(prev => ({ ...prev, firstName: item }));
//               }}
//             /> */}
//             <SelectAsync
//               className="w-full"
//               label="Фамилия"
//               placeholder="Фамилия родителя"
//               options={filterOptions.parentsLastNameOptions}
//               fetchOptions={async () => {
//                 setSelectedFilters(prev => ({ ...prev, lastName: null }));
//               }}
//               value={selectedFilters.lastName}
//               onChange={item => setSelectedFilters(prev => ({ ...prev, lastName: item }))}
//             />

//             {/* <SelectAsync
//               className="w-full"
//               label="Дата рождения"
//               placeholder="Выберите дату рождения..."
//               options={filterOptions.parentsBirthDateOptions}
//               fetchOptions={async () => {
//                 setSelectedFilters(prev => ({ ...prev, birthDate: null }));
//               }}
//               value={selectedFilters.birthDate}
//               onChange={item => setSelectedFilters(prev => ({ ...prev, birthDate: item }))}
//             /> */}
//           </div>
//           <ActionIcon mt={18} onClick={() => refetch()} size={36} color="#7c68ee">
//             <IconReload size={18} />
//           </ActionIcon>
//         </div>

//         {isLoading ? (
//           <Center h="60vh">
//             <Loader color="#7c68ee" />
//           </Center>
//         ) : data.length === 0 ? (
//           <Center h="30vh">
//             <Text fz={20}>Ничего не найдено</Text>{' '}
//           </Center>
//         ) : (
//           <ParentsTable withDelete deleteRows={deleteParent} data={data} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Parents;

'use client';
import React, { FC, useState } from 'react';
import { SelectAsync } from '@/app/components/SelectAsync';
import { ActionIcon, Center, Loader, Text, Title } from '@mantine/core';
import StudentsTable from '@/app/components/StudentsTable/StudentsTable';
import { Handbook } from '@/types/handbook';
import { IconReload } from '@tabler/icons-react';
import { useStudentDelete } from '../students/useStudentDelete';
import { useStudentsFilterQuery } from '../students/useStudentsFilterQuery';

interface SelectedFilters {
  firstName: Handbook | null;
  lastName: Handbook | null;
  birthYear: Handbook | null;
  enrollmentYear: Handbook | null;
  parentId: Handbook | null;
  classTeacherId: Handbook | null;
}

const Students: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    firstName: null,
    lastName: null,
    birthYear: null,
    enrollmentYear: null,
    parentId: null,
    classTeacherId: null,
  });

  const { data, refetch, filterOptions, isLoading } = useStudentsFilterQuery(selectedFilters);
  const { mutateAsync: deleteStudent } = useStudentDelete();

  return (
    <div className="mt-10 mx-20">
      <div>
        <Title mb={30}>Поиск ученика </Title>
        <div className="flex gap-6">
          <div className="flex w-full gap-3">
            <SelectAsync
              className="w-full"
              placeholder="Выберите год поступления..."
              label="Год поступления"
              options={filterOptions.studentsEnrollmentYearOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, enrollmentYear: null }));
              }}
              value={selectedFilters.enrollmentYear}
              onChange={item => setSelectedFilters(prev => ({ ...prev, enrollmentYear: item }))}
            />
            <SelectAsync
              className="w-full"
              label="Классный руковолитель"
              placeholder="Выберите классного руковолителя..."
              options={filterOptions.studentClassTeacherOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, classTeacherId: null }));
              }}
              value={selectedFilters.classTeacherId}
              onChange={item => setSelectedFilters(prev => ({ ...prev, classTeacherId: item }))}
            />
            {/* <SelectAsync
              className="w-full"
              placeholder="Имя ученика"
              options={filterOptions.studentsFirstNameOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, firstName: null }));
              }}
              value={selectedFilters.firstName}
              onChange={async item => {
                setSelectedFilters(prev => ({ ...prev, firstName: item }));
              }}
            /> */}
            {/* <SelectAsync
              className="w-full"
              placeholder="Фамилия ученика"
              options={filterOptions.studentsLastNameOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, lastName: null }));
              }}
              value={selectedFilters.lastName}
              onChange={item => setSelectedFilters(prev => ({ ...prev, lastName: item }))}
            /> */}

            {/* <SelectAsync
              className="w-full"
              label="Год рождения"
              placeholder="Выберите год рождения..."
              options={filterOptions.studentsBirthYearOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, birthYear: null }));
              }}
              value={selectedFilters.birthYear}
              onChange={item => setSelectedFilters(prev => ({ ...prev, birthYear: item }))}
            /> */}

            {/* <SelectAsync
              className="w-full"
              label="Родитель"
              placeholder="Выберите родителя..."
              options={filterOptions.studentParentOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, parentId: null }));
              }}
              value={selectedFilters.parentId}
              onChange={item => setSelectedFilters(prev => ({ ...prev, parentId: item }))}
            /> */}
          </div>
          <ActionIcon mt={16} onClick={() => refetch()} size={36} color="#7c68ee">
            <IconReload size={18} />
          </ActionIcon>
        </div>

        {isLoading ? (
          <Center h="60vh">
            <Loader color="#7c68ee" />
          </Center>
        ) : data.length === 0 ? (
          <Center h="30vh">
            <Text fz={20}>Ничего не найдено</Text>{' '}
          </Center>
        ) : (
          <StudentsTable withDelete deleteRows={deleteStudent} data={data} />
        )}
      </div>
    </div>
  );
};

export default Students;
