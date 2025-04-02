import { Button, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { FC } from 'react';
import classes from './SearchGroup.module.css';

interface SearchGoupProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const SearchGroup: FC<SearchGoupProps> = ({ value, onChange, onSubmit }) => {
  return (
    <div className="flex gap-5">
      <Input
        classNames={{ input: classes.input }}
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        leftSection={<IconSearch size="1.2rem" />}
        placeholder="Введите поисковой запрос"
      />
      <Button color="#7c68ee" onClick={onSubmit}>
        Поиск
      </Button>
    </div>
  );
};
