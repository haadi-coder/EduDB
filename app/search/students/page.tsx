import React from 'react';
import { View } from './View';
import { getStudents } from './getStudents';

const Students = async () => {
  const { data } = await getStudents({
    search: '',
    birthDate: null,
    enrollmentYear: null,
    firstName: null,
    lastName: null,
  });

  return (
    <div className="mt-10 mx-10">
      <View data={data} />
    </div>
  );
};

export default Students;
