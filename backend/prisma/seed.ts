import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Roles
  await prisma.role.createMany({
    data: [
      { name: 'Admin', companyId: 'c1' },
      { name: 'Manager', companyId: 'c1' },
      { name: 'Employee', companyId: 'c1' },
    ],
  });

  // Leave Types
  await prisma.leaveType.createMany({
    data: [
      { name: 'Annual Leave', companyId: 'c1' },
      { name: 'Sick Leave', companyId: 'c1' },
    ],
  });

  // Subscription Plans
  await prisma.subscriptionPlan.createMany({
    data: [
      { name: 'Basic', price: 1000 },
      { name: 'Premium', price: 5000 },
      { name: 'Enterprise', price: 10000 },
    ],
  });

  // Recruitment Stages
  await prisma.recruitmentStage.createMany({
    data: [
      { companyId: 'c1', name: 'Applied', order: 1 },
      { companyId: 'c1', name: 'Shortlisted', order: 2 },
      { companyId: 'c1', name: 'Interview', order: 3 },
      { companyId: 'c1', name: 'Offered', order: 4 },
      { companyId: 'c1', name: 'Hired', order: 5 },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
