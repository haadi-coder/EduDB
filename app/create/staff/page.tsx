'use client';

import { Handbook } from '@/types/handbook';
import { Button, Flex, Grid, Group, Stack, Switch, Text, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React, { FC, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { useStudentsFilterQuery } from '@/app/search/students/useStudentsFilterQuery';
import axios from 'axios';
import { StaffFormValues } from './types/StaffFormValues';
import { MultiSelectAsync } from '@/app/components/MultiSelectAsync';

const createStaff = async (data: StaffFormValues) => {
  const response = await axios.post(`/api/staff`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateStaff: FC = () => {
  const [selectedStudents, setSelectedStudents] = useState<Handbook[]>([]);

  const form = useForm<StaffFormValues>({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      isClassTeacher: false,
      position: '',
      studentIds: [],
    },
    validate: {
      firstName: isNotEmpty(),
      lastName: isNotEmpty(),
      birthDate: isNotEmpty(),
      position: isNotEmpty(),
    },
  });

  const { filterOptions: children } = useStudentsFilterQuery();

  const handleSubmit = (formValues: StaffFormValues) => {
    createStaff(formValues);
    form.reset();
    setSelectedStudents([]);
  };

  return (
    <form
      onSubmit={form.onSubmit(values => handleSubmit(values))}
      className="h-[52vh] mt-10 mx-100 p-10  bg-[#24263a] rounded-lg"
    >
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Фамилия"
            placeholder="Введите фамилию..."
            {...form.getInputProps('lastName')}
          />
          <TextInput
            className="w-full mt-5"
            label="Дата рождения"
            placeholder="Введите дату рождения..."
            {...form.getInputProps('birthDate')}
          />
          <TextInput
            className="w-full mt-5"
            label="Роль"
            placeholder="Введите роль..."
            {...form.getInputProps('position')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Имя"
            placeholder="Введите имя..."
            {...form.getInputProps('firstName')}
          />

          <MultiSelectAsync
            placeholder="Ученики"
            className="mt-11 text-white"
            options={children.studentsOptions}
            value={selectedStudents}
            onChange={payload => {
              setSelectedStudents(payload);
              form.setFieldValue(
                'studentIds',
                payload.map(item => item.value),
              );
            }}
          />
          <Stack className="mt-7" gap={8}>
            <Text size="14px">Классный руководитель</Text>
            <Switch
              className="w-full mt-2"
              size="md"
              labelPosition="left"
              placeholder="Введите номер..."
              {...form.getInputProps('isClassTeacher')}
            />
          </Stack>
        </Grid.Col>
      </Grid>

      <Flex justify="end">
        <Group className="mt-8">
          <Button disabled={!form.isValid()} color="#7c68ee" type="submit">
            Добавить <IconPlus size={16} className="ml-3" />
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default CreateStaff;
