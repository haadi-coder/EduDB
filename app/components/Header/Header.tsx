import { Group, Text } from '@mantine/core';
import { IconSchool } from '@tabler/icons-react';
import React from 'react';
import { NavButtons } from './NavButtons';

const Header = () => {
  return (
    <header className="flex justify-between items-center pl-32 pr-10 py-4 bg-[#24263a] sticky top-0 z-10">
      <Group gap="14px" align="center">
        <IconSchool color="#7c68ee" size="2.5rem" />
        <Text fw={700} fz="1.5rem">
          EducationDB
        </Text>
      </Group>
      <NavButtons />
    </header>
  );
};

export default Header;
