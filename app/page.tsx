'use client';
import { Box, Center, Flex, Loader, Pagination, Stack, Text } from '@mantine/core';
import { IconFriends, IconSchool, IconUserFilled } from '@tabler/icons-react';
import { useStatisticsQuery } from './hooks/useStatisticsQuery';
import { StudentsCountByClasses } from './types/Statistics';
import { usePagination } from './hooks/usePagination';
import classes from '@/app/Statistics.module.css';

export default function Home() {
  const { data: statistics, isLoading } = useStatisticsQuery();
  const { currentItems, page, total, setPage } = usePagination<StudentsCountByClasses>(
    statistics?.studentsCountByClasses || [],
    5,
  );

  const studentsCountByAgeGroups = Object.entries(statistics?.studentsCountByAgeGroups || {}).map(
    ([key, value]) => ({
      key,
      value,
    }),
  );

  return (
    <main className="pt-10 px-20">
      <Flex gap={20} justify="space-between">
        <Box className="flex items-center  bg-[#2e2e2e]  px-12 rounded-2xl h-[140px]">
          <Stack mr={90} gap={16}>
            <Text size="18px">Всего учеников</Text>
            {isLoading ? (
              <Loader color="#7c68ee" />
            ) : (
              <Text size="42px" fw="bold" c="#8270f6">
                {statistics?.studentsCount}
              </Text>
            )}
          </Stack>
          <div className="bg-[#91b6f72a] size-24 rounded-[50%] flex items-center justify-center">
            <IconSchool color="#2563eb" size="3rem" />
          </div>
        </Box>

        <Box className="flex items-center  bg-[#2e2e2e]  px-12 rounded-2xl h-[140px]">
          <Stack mr={90} gap={16}>
            <Text size="18px">Всего сотрудников</Text>
            {isLoading ? (
              <Loader color="#7c68ee" />
            ) : (
              <Text size="42px" fw="bold" c="#8270f6">
                {statistics?.staffCount}
              </Text>
            )}
          </Stack>
          <div className="bg-[#d1fae53a] size-24 rounded-[50%] flex items-center justify-center">
            <IconUserFilled color="#059669" size="3rem" />
          </div>
        </Box>

        <Box className="flex items-center  bg-[#2e2e2e]  px-12 rounded-2xl h-[140px]">
          <Stack mr={90} gap={16}>
            <Text size="18px">Всего Родителей</Text>
            {isLoading ? (
              <Loader color="#7c68ee" />
            ) : (
              <Text size="42px" fw="bold" c="#8270f6">
                {statistics?.parentsCount}
              </Text>
            )}
          </Stack>
          <div className="bg-[#ede9fe1c] size-24 rounded-[50%] flex items-center justify-center">
            <IconFriends color="#7c3aed" size="3rem" />
          </div>
        </Box>
      </Flex>

      <Flex gap={20} mt={16}>
        <Box className="py-5 px-10 bg-[#2e2e2e] w-full rounded-2xl h-full min-h-[400px]  flex flex-col justify-between">
          <Stack gap={12} className="h-[65%] mt-4">
            <Text>Количество учеников в классе</Text>
            {isLoading ? (
              <Center h="20vh">
                <Loader color="#7c68ee" />
              </Center>
            ) : (
              currentItems?.map(item => (
                <div
                  key={item.className}
                  className="flex justify-between bg-[#ede9fe1c] px-4 py-2 rounded-lg hover:bg-[#7c68ee31]"
                >
                  <Text>{item.className}</Text>
                  <Text>{item.count} чел.</Text>
                </div>
              ))
            )}
          </Stack>

          <div className="h-[25%] flex justify-center mt-3">
            <Pagination
              size="md"
              classNames={{ control: classes.paginationControls }}
              total={total}
              value={page}
              onChange={setPage}
              mt="sm"
            />
          </div>
        </Box>

        <Box className="py-5 px-10 bg-[#2e2e2e] w-full rounded-2xl h-full min-h-[400px]  flex flex-col justify-between">
          <Stack gap={12} className="h-[65%] mt-4">
            <Text>Количество учеников по возрастам</Text>
            {isLoading ? (
              <Center h="20vh">
                <Loader color="#7c68ee" />
              </Center>
            ) : (
              studentsCountByAgeGroups?.map(item => (
                <div
                  key={item.key}
                  className="flex justify-between bg-[#ede9fe1c] px-4 py-2 rounded-lg hover:bg-[#7c68ee31]"
                >
                  <Text>{item.key} лет</Text>
                  <Text>{item.value} чел.</Text>
                </div>
              ))
            )}
          </Stack>
        </Box>
      </Flex>
    </main>
  );
}
