'use client';
import { SelectAsync } from '@/app/components/SelectAsync';
import { Button, Flex, Group, NumberInput, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import React, { FC, useState } from 'react';
import { StudentFormValues } from './types/StudentFormValues';
import { Handbook } from '@/types/handbook';
import { useClassesFilterQuery } from '@/app/search/classes/useClassesFilterQuery';
import { useStaffFilterQuery } from '@/app/search/staff/useStaffFilterQuery';
import axios from 'axios';
import { useParentFilterQuery } from '@/app/search/parents/useParentsFilterQuery';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import { DatePickerInput } from '@mantine/dates';

const createStudent = async (data: StudentFormValues) => {
  const response = await axios.post(`/api/students`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return { status: response.status, data: response.data };
};

const CreateStudent: FC = () => {
  const [selectedClass, setSelectedClass] = useState<Handbook | null>();
  const [selectedClassTeacher, setSelectedClassTeacher] = useState<Handbook | null>();
  const [selectedParent, setSelectedParent] = useState<Handbook | null>();

  const [isStaffEditable] = useState(false);
  const [isParentEditable] = useState(false);

  const form = useForm<StudentFormValues>({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      birthDate: null,
      enrollmentYear: 2025,
      classId: null,
      classTeacherId: null,
      classTeacher: {
        firstName: '',
        lastName: '',
        isClassTeacher: true,
      },
      parentId: null,
      parent: {
        firstName: '',
        lastName: '',
      },
    },
    validate: {
      firstName: isNotEmpty(),
      lastName: isNotEmpty(),
      birthDate: isNotEmpty(),
      enrollmentYear: isNotEmpty(),
    },
  });

  const { filterOptions: classes } = useClassesFilterQuery();
  const { filterOptions: classTeachers } = useStaffFilterQuery();
  const { filterOptions: parents } = useParentFilterQuery();

  const handleSubmit = async (formValues: StudentFormValues) => {
    try {
      const { status } = await createStudent(formValues);
      if (status === 201 || status === 200) {
        form.reset();
        setSelectedClass(null);
        setSelectedClassTeacher(null);
        setSelectedParent(null);

        notifications.show({
          title: 'Успешно',
          message: 'Добавление ученика прошло успешно',
          color: 'green',
        });
      }
    } catch {
      notifications.show({
        title: 'Ошибка',
        message: 'Что-тоо пошло не так. Заполните все необходимые поля',
        color: 'red',
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Title mt={30}>Добавление ученика</Title>
      <form
        onSubmit={form.onSubmit(values => handleSubmit(values))}
        className="mt-6 min-w-[420px] p-10 pt-8  pb-5  bg-[#24263a] rounded-lg"
      >
        <div className="flex flex-col gap-5">
          <TextInput
            className="w-full"
            label="Фамилия"
            placeholder="Введите фамилию..."
            {...form.getInputProps('lastName')}
          />
          <div className="flex gap-5">
            <TextInput
              className="w-full flex-7/12"
              label="Имя"
              placeholder="Введите имя..."
              {...form.getInputProps('firstName')}
            />

            <DatePickerInput
              valueFormat="DD.MM.YYYY"
              className="w-full flex-5/12"
              label="Дата рождения"
              placeholder="дд.мм.гггг"
              {...form.getInputProps('birthDate')}
            />
          </div>

          <div className="flex gap-5">
            <NumberInput
              className=" "
              label="Год поступления"
              placeholder="Введите год..."
              {...form.getInputProps('enrollmentYear')}
            />
            <SelectAsync
              placeholder="класс"
              className="mt-6 w-full flex-7/12"
              options={classes.classesNames}
              value={selectedClass || null}
              onChange={payload => {
                setSelectedClass(payload);
                form.setFieldValue('classId', payload?.value || null);
              }}
            />
          </div>
          <div className="flex gap-4">
            {isStaffEditable ? (
              <TextInput
                onChange={e => {
                  const [lastName, firstName] = e.currentTarget.value.split(' ');
                  form.setFieldValue('classTeacher.lastName', lastName);
                  form.setFieldValue('classTeacher.firstName', firstName);
                }}
                className="flex-1"
                placeholder="Введите персонал"
              />
            ) : (
              <SelectAsync
                className="flex-1"
                placeholder="Персонал"
                options={classTeachers.staffClassTeacherOptions}
                value={selectedClassTeacher || null}
                onChange={payload => {
                  setSelectedClassTeacher(payload);
                  form.setFieldValue('classTeacherId', payload?.value || null);
                }}
              />
            )}
            <Button mt={5} color="#7c68ee" component={Link} href="/create/staff">
              {!isStaffEditable ? 'Добавить' : 'Выбрать'}
            </Button>
          </div>

          <div className="flex gap-4">
            {!isParentEditable ? (
              <TextInput
                onChange={e => {
                  const [lastName, firstName] = e.currentTarget.value.split(' ');
                  form.setFieldValue('parent.lastName', lastName);
                  form.setFieldValue('parent.firstName', firstName);
                }}
                className="flex-1"
                placeholder="Введите фамилию и имя родителя"
              />
            ) : (
              <SelectAsync
                className="flex-1"
                placeholder="Родитель"
                options={parents.parentsOptions}
                value={selectedParent || null}
                onChange={payload => {
                  setSelectedParent(payload);
                  form.setFieldValue('parentId', payload?.value || null);
                }}
              />
            )}
            <Button mt={5} color="#7c68ee" component={Link} href="/create/parent">
              Добавить
            </Button>
          </div>
        </div>

        <Flex justify="end">
          <Group className="mt-8">
            <Button disabled={!form.isValid()} color="#7c68ee" type="submit">
              Создать <IconPlus size={16} className="ml-3" />
            </Button>
          </Group>
        </Flex>
      </form>
    </div>
  );
};

export default CreateStudent;
