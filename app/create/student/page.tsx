'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Button, Flex, Grid, Group, NumberInput, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import React, { FC, useState } from 'react';
import { StudentFormValues } from './types/StudentFormValues';
import { useParentFilterQuery } from '@/app/search/parents/useParentsFilterQuery';
import { Handbook } from '@/types/handbook';
import { useClassesFilterQuery } from '@/app/search/classes/useClassesFilterQuery';

const CreateStudent: FC = () => {
  const [selectedParent, setSelectedParent] = useState<Handbook | null>();
  const [selectedClass, setSelectedClass] = useState<Handbook | null>();
  const form = useForm<StudentFormValues>({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      enrollmentYear: 2025,
      classId: null,
      classTeacherId: null,
      parentId: null,
    },
    validate: {
      firstName: isNotEmpty(),
      lastName: isNotEmpty(),
      birthDate: isNotEmpty(),
      enrollmentYear: isNotEmpty(),
    },
  });

  const { filterOptions: parents } = useParentFilterQuery();
  const { filterOptions: classes } = useClassesFilterQuery();

  return (
    <form className="h-[48vh] mt-10 mx-122 p-10  bg-[#24263a] rounded-lg">
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
          <SelectAsync
            placeholder="Родитель"
            className="mt-5"
            options={parents.parentsOptions}
            value={selectedParent || null}
            onChange={payload => {
              setSelectedParent(payload);
              form.setFieldValue('parentId', payload?.value || null);
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className="w-full"
            label="Имя"
            placeholder="Введите имя..."
            {...form.getInputProps('firstName')}
          />

          <div className="flex gap-5">
            <NumberInput
              className="mt-5 "
              label="Год поступления"
              placeholder="Введите год..."
              {...form.getInputProps('enrollmentYear')}
            />
            <SelectAsync
              placeholder="класс"
              className="mt-11 w-full flex-7/12"
              options={classes.classesNames}
              value={selectedClass || null}
              onChange={payload => {
                setSelectedClass(payload);
                form.setFieldValue('classId', payload?.value || null);
              }}
            />
          </div>
          <SelectAsync
            placeholder="Классный руководитель"
            className="mt-5"
            options={[]}
            fetchOptions={() => {}}
            value={{ value: '', label: '' }}
            onChange={() => {}}
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
  );
};

export default CreateStudent;
