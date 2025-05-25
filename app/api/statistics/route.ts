import prisma from '@/lib/prisma';

function calculateAge(birthDate: string) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export const GET = async () => {
  try {
    const studentsCount = await prisma.student.count();

    const staffCount = await prisma.staff.count();

    const parentsCount = await prisma.parent.count();

    const studentsCountByClasses = await prisma.student.groupBy({
      by: ['classId'],
      _count: {
        id: true,
      },
      where: {
        classId: {
          not: null,
        },
      },
    });

    const classIds = studentsCountByClasses.map(item => item.classId || '');

    const classes = await prisma.class.findMany({
      where: {
        id: {
          in: classIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const classMap = new Map(classes.map(cls => [cls.id, cls.name]));

    const formattedStudentsCountByClasses = studentsCountByClasses.map(item => ({
      className: classMap.get(item.classId || '') || 'Unknown',
      count: item._count.id,
    }));

    const allStudents = await prisma.student.findMany({
      select: {
        birthDate: true,
      },
    });

    const ageGroups = {
      '6-9': 0,
      '13-15': 0,
      '16-18': 0,
      '10-12': 0,
      '19+': 0,
    };

    allStudents.forEach(student => {
      const age = calculateAge(student.birthDate || '');

      if (age >= 6 && age <= 9) {
        ageGroups['6-9']++;
      } else if (age >= 13 && age <= 15) {
        ageGroups['13-15']++;
      } else if (age >= 16 && age <= 18) {
        ageGroups['16-18']++;
      } else if (age >= 10 && age <= 12) {
        ageGroups['10-12']++;
      } else {
        ageGroups['19+']++;
      }
    });

    return Response.json({
      studentsCount,
      staffCount,
      parentsCount,
      studentsCountByClasses: formattedStudentsCountByClasses,
      studentsCountByAgeGroups: ageGroups,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
};
