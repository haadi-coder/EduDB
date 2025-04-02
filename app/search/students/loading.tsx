import { Center, Loader } from '@mantine/core';
import React from 'react';

const loading = () => {
  return (
    <Center h="60vh">
      <Loader color="#7c68ee" />
    </Center>
  );
};

export default loading;
