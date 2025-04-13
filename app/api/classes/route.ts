import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const parents = await prisma.class.findMany({
    select: {
      id: true,
      name: true,
      capacity: true,
      students: true,
    },
  });

  return NextResponse.json(parents, { status: 200 });
};
