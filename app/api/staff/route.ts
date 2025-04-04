import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('s');
  const firstName = searchParams.get('fn');
  const lastName = searchParams.get('ln');
  const birthDate = searchParams.get('bd');
  const position = searchParams.get('p');

  const where: Prisma.StaffWhereInput = {};

  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { position: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (firstName) {
    where.firstName = firstName;
  }

  if (lastName) {
    where.lastName = lastName;
  }

  if (birthDate) {
    where.birthDate = birthDate;
  }

  if (position) {
    where.position = position;
  }

  const staff = await prisma.staff.findMany({
    where,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      birthDate: true,
      position: true,
      isClassTeacher: true,
      students: true,
    },
  });

  return NextResponse.json(staff, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const requestData = await request.json();

  const newStaff = await prisma.staff.create({
    data: {
      firstName: requestData.firstName,
      lastName: requestData.lastName,
      birthDate: requestData.birthDate,
      position: requestData.position,
      isClassTeacher: requestData.isClassTeacher,
      students: requestData.students,
    },
  });

  return NextResponse.json(newStaff, { status: 201 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  await prisma.staff.delete({ where: { id: id || '' } });

  return NextResponse.json({ message: 'Работник был успешно удален' }, { status: 200 });
};
