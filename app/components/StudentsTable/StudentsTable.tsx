'use client';

import { usePagination } from '@/app/hooks/usePagination';
import { Student } from '@/app/search/students/types/Student';
import { ActionIcon, Pagination, Table } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import classes from './StudentsTable.module.css';

import React, { FC } from 'react';

interface StudentsTableProps {
  data: Student[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}
const StudentsTable: FC<StudentsTableProps> = ({ data, withDelete, deleteRows }) => {
  const { currentItems, page, total, setPage } = usePagination<Student>(data);

  const rows = currentItems.map(item => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.firstName}</Table.Td>
      <Table.Td>{item.lastName}</Table.Td>
      <Table.Td>{item.birthDate}</Table.Td>
      <Table.Td>{item.enrollmentYear}</Table.Td>
      {withDelete && (
        <Table.Td>
          <ActionIcon variant="subtle" onClick={() => deleteRows?.(item.id)}>
            <IconTrash />
          </ActionIcon>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Table
      horizontalSpacing="100px"
      verticalSpacing="16px"
      highlightOnHover
      className=" mt-8 rounded-md"
      highlightOnHoverColor="#7c68ee31"
      bg="#24263a"
      withColumnBorders
      borderColor="#484848"
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="text-[18px] text-[#7c68ee]">Имя</Table.Th>
          <Table.Th className="text-[18px] text-[#7c68ee]">Фамилия</Table.Th>
          <Table.Th className="text-[18px] text-[#7c68ee]">Дата рождения</Table.Th>
          <Table.Th className="text-[18px] text-[#7c68ee]">Год поступления</Table.Th>
          {withDelete && <Table.Th p={0} className="w-[5px]" />}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>
        <div className="flex justify-center">
          <Pagination
            size="md"
            classNames={{ control: classes.paginationControls }}
            total={total}
            value={page}
            onChange={setPage}
            mt="sm"
          />
        </div>
      </Table.Caption>
    </Table>
  );
};

export default StudentsTable;
