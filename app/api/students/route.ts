import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('s');
  const firstName = searchParams.get('fn');
  const lastName = searchParams.get('ln');
  const birthDate = searchParams.get('bd');
  const enrollmentYear = searchParams.get('ey');

  const where: Prisma.StudentWhereInput = {};

  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
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

  if (enrollmentYear) {
    where.enrollmentYear = parseInt(enrollmentYear);
  }

  const students = await prisma.student.findMany({
    where,
    select: {
      id: true,
      birthDate: true,
      enrollmentYear: true,
      firstName: true,
      lastName: true,
      parent: true,
      scores: true,
      classTeacher: true,
      class: true,
    },
  });

  return NextResponse.json(students, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const requestData = await request.json();

  const newStudent = await prisma.student.create({
    data: {
      firstName: requestData.firstName,
      lastName: requestData.lastName,
      birthDate: requestData.birthDate,
      enrollmentYear: requestData.enrollmentYear,
      parent: requestData.parentId
        ? { connect: { id: requestData.parentId } }
        : {
            create: {
              lastName: requestData.lastName,
              firstName: requestData.firstName,
            },
          },
      scores: requestData.scores,
      classTeacher: requestData.classTeacherId
        ? { connect: { id: requestData.classTeacherId } }
        : {
            create: {
              firstName: requestData.classTeacher.firstName,
              lastName: requestData.classTeacher.lastName,
              isClassTeacher: requestData.classTeacher.isClassTeacher,
            },
          },
      class: { connect: { id: requestData.classId } },
    },
  });

  return NextResponse.json(newStudent, { status: 201 });
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const id = searchParams.get('id');

  await prisma.student.delete({ where: { id: id || '' } });

  return NextResponse.json({ message: 'Ученик был успешно удален' }, { status: 200 });
};
