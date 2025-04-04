import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const firstName = searchParams.get('fn');
  const lastName = searchParams.get('ln');
  const birthDate = searchParams.get('bd');
  const role = searchParams.get('r');

  const where: Prisma.ParentWhereInput = {};

  if (firstName) {
    where.firstName = firstName;
  }

  if (lastName) {
    where.lastName = lastName;
  }

  if (birthDate) {
    where.birthDate = birthDate;
  }

  if (role) {
    where.role = role;
  }

  const parents = await prisma.parent.findMany({
    where,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      birthDate: true,
      role: true,
      childrens: true,
      phoneNumber: true,
    },
  });

  return NextResponse.json(parents, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const requestData = await request.json();

  const newParent = await prisma.parent.create({
    data: {
      firstName: requestData.firstName,
      lastName: requestData.lastName,
      birthDate: requestData.birthDate,
      role: requestData.role,
      childrens: requestData.childrens,
      phoneNumber: requestData.phoneNumber,
    },
  });

  return NextResponse.json(newParent, { status: 201 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  await prisma.parent.delete({ where: { id: id || '' } });

  return NextResponse.json({ message: 'Родитель был успешно удален' }, { status: 200 });
};
