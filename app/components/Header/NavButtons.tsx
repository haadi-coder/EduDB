'use client';
import { Button, Menu } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

export const NavButtons: FC = () => {
  const currentPathname = usePathname();

  return (
    <div className="flex justify-center gap-4">
      <Button color="#7c68ee" variant={currentPathname === '/' ? 'filled' : 'subtle'}>
        <Link href="/">Статистика</Link>
      </Button>

      <Menu trigger="click">
        <Menu.Target>
          <Button
            color="#7c68ee"
            variant={currentPathname.startsWith('/search') ? 'filled' : 'subtle'}
          >
            Поиск
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {/* <Menu.Item component={Link} href="/search/students">
            Ученики
          </Menu.Item>
          <Menu.Item component={Link} href="/search/staff">
            Персонал
          </Menu.Item>
          <Menu.Item component={Link} href="/search/parents">
            Родители
          </Menu.Item> */}

          <Menu.Item component={Link} href="/search/students">
            Поиск по одному атрибуту
          </Menu.Item>
          <Menu.Item component={Link} href="/search/parents">
            Поиск по двум атрибутам
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* <Menu trigger="click">
        <Menu.Target>
          <Button
            color="#7c68ee"
            variant={
              currentPathname.startsWith('/create') || currentPathname.startsWith('/delete')
                ? 'filled'
                : 'subtle'
            }
          >
            Добавление данных
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} href="/create/student">
            Добавить Ученика
          </Menu.Item>
          <Menu.Item component={Link} href="/create/staff">
            Добавить Персонал
          </Menu.Item>
          <Menu.Item component={Link} href="/create/parent">
            Добавить Родителя
          </Menu.Item>
        </Menu.Dropdown>
      </Menu> */}
      <Button
        color="#7c68ee"
        variant={
          currentPathname.startsWith('/create') || currentPathname.startsWith('/delete')
            ? 'filled'
            : 'subtle'
        }
        component={Link}
        href="/create/student"
      >
        Добавление данных
      </Button>
    </div>
  );
};
