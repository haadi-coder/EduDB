'use client';

import { Handbook } from '@/types/handbook';
import { Button, Flex, Group, TextInput, Title } from '@mantine/core';
import { isNotEmpty, matches, useForm } from '@mantine/form';
import React, { FC, useState } from 'react';
import { ParentFormValues } from './types/ParentFormValues';
import { IconPlus } from '@tabler/icons-react';
import { useStudentsFilterQuery } from '@/app/search/students/useStudentsFilterQuery';
import axios from 'axios';
import { MultiSelectAsync } from '@/app/components/MultiSelectAsync';
import { notifications } from '@mantine/notifications';
import { SelectAsync } from '@/app/components/SelectAsync';
import { useParentFilterQuery } from '@/app/search/parents/useParentsFilterQuery';
import { DatePickerInput } from '@mantine/dates';
import PhoneInput from 'react-phone-number-input/input';

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
  const [selectedRole, setSelectedRole] = useState<Handbook | null>(null);

  const [isChildrenEditable, setIsChildrenEditable] = useState(false);

  const form = useForm<ParentFormValues>({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      birthDate: null,
      childrenIds: [],
      child: {
        firstName: '',
        lastName: '',
        birthDate: new Date().toLocaleDateString('ru'),
        enrollmentYear: new Date().getFullYear(),
      },
      phoneNumber: '',
      role: '',
    },
    validate: {
      firstName: isNotEmpty(),
      lastName: isNotEmpty(),
      birthDate: isNotEmpty(),
      phoneNumber: matches(/(?:\+|\d)[\d\-\(\) ]{9,}\d/g),
      role: isNotEmpty(),
    },
  });

  const { filterOptions: children } = useStudentsFilterQuery();
  const { filterOptions: parents } = useParentFilterQuery();

  const handleSubmit = async (formValues: ParentFormValues) => {
    try {
      const { status } = await createParent(formValues);

      if (status === 201 || status === 200) {
        form.reset();
        setSelectedChildren([]);
        setSelectedRole(null);
        setIsChildrenEditable(false);

        notifications.show({
          title: 'Успешно',
          message: 'Добавление родителя прошло успешно',
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
      <Title mt={40}>Добавление родителя</Title>
      <form
        onSubmit={form.onSubmit(values => handleSubmit(values))}
        className=" min-w-[420px] mt-5 p-10 pt-8 pb-6  bg-[#24263a] rounded-lg"
      >
        <div className="flex flex-col gap-5">
          <TextInput
            className="w-full"
            label="Фамилия"
            placeholder="Введите фамилию..."
            {...form.getInputProps('lastName')}
          />
          <TextInput
            className="w-full"
            label="Имя"
            placeholder="Введите имя..."
            {...form.getInputProps('firstName')}
          />
          <div className="flex gap-5">
            <DatePickerInput
              valueFormat="DD.MM.YYYY"
              className="w-full"
              label="Дата рождения"
              placeholder="дд.мм.гггг"
              {...form.getInputProps('birthDate')}
            />
            <SelectAsync
              className="w-40"
              label="Роль"
              options={parents.parentsRoleOptions}
              value={selectedRole}
              placeholder="Введите роль..."
              onChange={value => {
                setSelectedRole(value);
                form.setFieldValue('role', value?.label || '');
              }}
            />
          </div>

          <PhoneInput
            country="RU"
            className="w-full bg-[#2e2e2e] pl-3 py-1 rounded-sm border-gray-600 border-1 placeholder:text-[0.8rem] placeholder:text-[#b5bdc5]"
            type="tel"
            label="Номер телефона"
            placeholder="8 (999) 999-99-99"
            {...form.getInputProps('phoneNumber')}
          />
          <div className="flex gap-5">
            {isChildrenEditable ? (
              <TextInput
                onChange={e => {
                  const [lastName, firstName] = e.currentTarget.value.split(' ');
                  console.log(lastName, firstName);
                  form.setFieldValue('child.lastName', lastName ?? '');
                  form.setFieldValue('child.firstName', firstName ?? '');
                }}
                className="flex-1"
                placeholder="Введите фамилию и имя ребенка"
              />
            ) : (
              <MultiSelectAsync
                className="flex-1"
                placeholder="Ребенок"
                options={children.studentsOptions}
                value={selectedChildren}
                onChange={payload => {
                  setSelectedChildren(payload);
                  form.setFieldValue(
                    'childrenIds',
                    payload.map(item => ({ id: item.value })),
                  );
                }}
              />
            )}

            <Button onClick={() => setIsChildrenEditable(prev => !prev)} color="#7c68ee">
              {isChildrenEditable ? 'Выбрать' : 'Добавить'}
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

export default CreateParent;
