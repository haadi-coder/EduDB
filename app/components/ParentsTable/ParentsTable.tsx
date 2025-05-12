'use client';
import { usePagination } from '@/app/hooks/usePagination';
import { Parent } from '@/app/search/parents/types/Parent';
import { ActionIcon, Pagination, Table } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IconChecks, IconEdit, IconTrash } from '@tabler/icons-react';
import React, { FC } from 'react';
import classes from './ParentsTable.module.css';

interface StaffTableProps {
  data: Parent[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}

const ParentsTable: FC<StaffTableProps> = ({ data, withDelete, deleteRows }) => {
  const { currentItems, page, total, setPage } = usePagination<Parent>(data, 5);
  const [isEditable, setIsEditable] = useToggle();

  const rows = currentItems.map(item => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.firstName}</Table.Td>
      <Table.Td>{item.lastName}</Table.Td>
      <Table.Td>{item.birthDate}</Table.Td>
      <Table.Td>{item.phoneNumber}</Table.Td>
      <Table.Td>{item.role}</Table.Td>
      <Table.Td>
        {item.childrens?.map(item => (
          <span key={item.id}>
            {item.firstName} {item.lastName}
          </span>
        ))}
      </Table.Td>
      {withDelete && isEditable && (
        <Table.Td p={10}>
          <ActionIcon color="red" variant="subtle" onClick={() => deleteRows?.(item.id)}>
            <IconTrash />
          </ActionIcon>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Table
      horizontalSpacing="55px"
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
          <Table.Th className="text-[18px] text-[#7c68ee]">Номер телефона</Table.Th>
          <Table.Th className="text-[18px] text-[#7c68ee]">Роль</Table.Th>
          <Table.Th className="text-[18px] text-[#7c68ee]">Дети</Table.Th>
          <Table.Th px={10} className="w-[40px]">
            <ActionIcon onClick={() => setIsEditable()} variant="subtle" color="#7c68ee">
              {!isEditable ? <IconEdit /> : <IconChecks />}
            </ActionIcon>
          </Table.Th>
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

export default ParentsTable;
