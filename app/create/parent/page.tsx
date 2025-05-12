'use client';

import { Handbook } from '@/types/handbook';
import { Button, Flex, Grid, Group, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React, { FC, useState } from 'react';
import { ParentFormValues } from './types/ParentFormValues';
import { IconPlus } from '@tabler/icons-react';
import { useStudentsFilterQuery } from '@/app/search/students/useStudentsFilterQuery';
import axios from 'axios';
import { MultiSelectAsync } from '@/app/components/MultiSelectAsync';

const createParent = async (data: ParentFormValues) => {
  const response = await axios.post(`/api/parents`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateParent: FC = () => {
  const [selectedChildren, setSelectedChildren] = useState<Handbook[]>([]);

  const form = useForm<ParentFormValues>({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      childrenIds: [],
      phoneNumber: '',
      role: '',
    },
    validate: {
      firstName: isNotEmpty(),
      lastName: isNotEmpty(),
      birthDate: isNotEmpty(),
      phoneNumber: isNotEmpty(),
      role: isNotEmpty(),
    },
  });

  const { filterOptions: children } = useStudentsFilterQuery();

  const handleSubmit = (formValues: ParentFormValues) => {
    createParent(formValues);
    form.reset();
    setSelectedChildren([]);
  };

  return (
    <div className="flex flex-col items-center">
      <Title mt={40}>Добавление родителя</Title>
      <form
        onSubmit={form.onSubmit(values => handleSubmit(values))}
        className="h-[52vh] w-[45%] mt-10 p-10  bg-[#24263a] rounded-lg"
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
              {...form.getInputProps('role')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              className="w-full"
              label="Имя"
              placeholder="Введите имя..."
              {...form.getInputProps('firstName')}
            />
            <TextInput
              className="w-full mt-5"
              label="Номер телефона"
              placeholder="Введите номер..."
              {...form.getInputProps('phoneNumber')}
            />
            <MultiSelectAsync
              placeholder="Ребенок"
              className="mt-11"
              options={children.studentsOptions}
              value={selectedChildren}
              onChange={payload => {
                setSelectedChildren(payload);
                form.setFieldValue(
                  'childrenIds',
                  payload.map(item => item.value),
                );
              }}
            />
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
    </div>
  );
};

export default CreateParent;
