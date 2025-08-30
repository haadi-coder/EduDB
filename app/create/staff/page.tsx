'use client';

import { Handbook } from '@/types/handbook';
import { Button, Flex, Group, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React, { FC, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import axios from 'axios';
import { StaffFormValues } from './types/StaffFormValues';
import { notifications } from '@mantine/notifications';
import { SelectAsync } from '@/app/components/SelectAsync';
import { useStaffFilterQuery } from '@/app/search/staff/useStaffFilterQuery';
import { DatePickerInput } from '@mantine/dates';

const createStaff = async (data: StaffFormValues) => {
  const response = await axios.post(`/api/staff`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const CreateStaff: FC = () => {
  // const [selectedStudents, setSelectedStudents] = useState<Handbook[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Handbook | null>(null);
  const [isPositionEditable, setIsPositionEditable] = useState(false);

  const form = useForm<StaffFormValues>({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      birthDate: null,
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

  // const { filterOptions: children } = useStudentsFilterQuery();
  const { filterOptions: staff } = useStaffFilterQuery();

  const handleSubmit = async (formValues: StaffFormValues) => {
    if (formValues.position === 'Классный руководитель') {
      formValues.isClassTeacher = true;
    }

    try {
      const { status } = await createStaff(formValues);

      if (status === 201 || status === 200) {
        form.reset();
        // setSelectedStudents([]);
        setSelectedPosition(null);

        notifications.show({
          title: 'Успешно',
          message: 'Добавление персонала прошло успешно',
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
      <Title mt={40}>Добавление персонала</Title>
      <form
        onSubmit={form.onSubmit(values => handleSubmit(values))}
        className=" min-w-[500px] mt-5 p-10 pt-8 pb-6 bg-[#24263a] rounded-lg"
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

          <DatePickerInput
            valueFormat="DD.MM.YYYY"
            maxDate={'2025.06.31'}
            className="w-full"
            label="Дата рождения"
            placeholder="дд.мм.гггг"
            {...form.getInputProps('birthDate')}
          />

          <div className="flex gap-5">
            {isPositionEditable ? (
              <TextInput
                mt={-6}
                className="w-full"
                label="Роль"
                placeholder="Введите роль..."
                {...form.getInputProps('position')}
              />
            ) : (
              <SelectAsync
                label="Роль"
                placeholder="Выберите роль"
                className="w-full"
                options={staff.staffPositionOptions}
                value={selectedPosition}
                onChange={value => {
                  setSelectedPosition(value);
                  form.setFieldValue('position', value?.label || '');
                }}
              />
            )}

            <Button
              mt={18}
              color="#7c68ee"
              className="flex-4/12"
              onClick={() => setIsPositionEditable(prev => !prev)}
            >
              {isPositionEditable ? 'Выбрать' : 'Добавить'}
            </Button>
          </div>

          {/* <div className="flex gap-5">
            <MultiSelectAsync
              label="Ученики"
              disabled={!form.values.isClassTeacher}
              placeholder="Ученики"
              className="text-white w-full"
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
            <Stack className="flex-6/12" gap={8}>
              <Text size="14px">Клас. руководитель</Text>
              <Switch
                className="w-full mt-2"
                size="md"
                labelPosition="left"
                placeholder="Введите номер..."
                {...form.getInputProps('isClassTeacher')}
              />
            </Stack>
          </div> */}
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

export default CreateStaff;
