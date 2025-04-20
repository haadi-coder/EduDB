'use client';
import { Handbook } from '@/types/handbook';
import React, { FC, useState } from 'react';
import { useStaffFilterQuery } from './useStaffFilterQuery';
import { SelectAsync } from '@/app/components/SelectAsync';
import { ActionIcon, Center, Loader, Text } from '@mantine/core';
import { IconReload } from '@tabler/icons-react';
import StaffTable from '@/app/components/StaffTable/StaffTable';
import { useStaffDelete } from './useStaffDelete';

interface SelectedFilters {
  firstName: Handbook | null;
  lastName: Handbook | null;
  birthDate: Handbook | null;
  position: Handbook | null;
}

const Staff: FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    firstName: null,
    lastName: null,
    birthDate: null,
    position: null,
  });

  const { data, refetch, filterOptions, isLoading } = useStaffFilterQuery(selectedFilters);
  const { mutateAsync: deleteStaff } = useStaffDelete();

  return (
    <div className="mt-10 mx-10">
      <div className="mt-20 mx-10 ">
        <div className="flex gap-6">
          <div className="flex w-full gap-3">
            <SelectAsync
              className="w-full"
              placeholder="Должность"
              options={filterOptions.staffPositionOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, position: null }));
              }}
              value={selectedFilters.position}
              onChange={item => setSelectedFilters(prev => ({ ...prev, position: item }))}
            />
            <SelectAsync
              className="w-full"
              placeholder="Имя работника"
              options={filterOptions.staffFirstNameOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, firstName: null }));
              }}
              value={selectedFilters.firstName}
              onChange={async item => {
                setSelectedFilters(prev => ({ ...prev, firstName: item }));
              }}
            />
            <SelectAsync
              className="w-full"
              placeholder="Фамилия работника"
              options={filterOptions.staffLastNameOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, lastName: null }));
              }}
              value={selectedFilters.lastName}
              onChange={item => setSelectedFilters(prev => ({ ...prev, lastName: item }))}
            />

            <SelectAsync
              className="w-full"
              placeholder="Дата рождения"
              options={filterOptions.staffBirthDateOptions}
              fetchOptions={async () => {
                setSelectedFilters(prev => ({ ...prev, birthDate: null }));
              }}
              value={selectedFilters.birthDate}
              onChange={item => setSelectedFilters(prev => ({ ...prev, birthDate: item }))}
            />
          </div>
          <ActionIcon onClick={() => refetch()} size={36} color="#7c68ee">
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
          <StaffTable withDelete deleteRows={deleteStaff} data={data} />
        )}
      </div>
    </div>
  );
};

export default Staff;
