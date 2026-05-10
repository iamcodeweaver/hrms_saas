import { Test, TestingModule } from '@nestjs/testing';
import { TrainingService } from './training.service';
import { PrismaService } from '../prisma.service';

describe('TrainingService', () => {
  let service: TrainingService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      trainingProgram: { create: jest.fn(), findMany: jest.fn() },
      enrollment: { create: jest.fn(), findMany: jest.fn() },
      certification: { create: jest.fn(), findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<TrainingService>(TrainingService);
  });

  it('should create a training program', async () => {
    await service.createProgram({ companyId: 'c1', title: 'Leadership', startDate: '2026-05-10' } as any);
    expect(prisma.trainingProgram.create).toHaveBeenCalledWith({
      data: {
        companyId: 'c1',
        title: 'Leadership',
        description: undefined,
        startDate: new Date('2026-05-10'),
        endDate: null,
      },
    });
  });

  it('should get programs including enrollments and certifications', async () => {
    await service.getPrograms('c1');
    expect(prisma.trainingProgram.findMany).toHaveBeenCalledWith({
      where: { companyId: 'c1' },
      include: { enrollments: true, certifications: true },
    });
  });

  it('should enroll an employee', async () => {
    await service.enroll({ employeeId: 'e1', programId: 'p1' } as any);
    expect(prisma.enrollment.create).toHaveBeenCalledWith({
      data: { employeeId: 'e1', programId: 'p1' },
    });
  });

  it('should get enrollments including employee', async () => {
    await service.getEnrollments('p1');
    expect(prisma.enrollment.findMany).toHaveBeenCalledWith({
      where: { programId: 'p1' },
      include: { employee: true },
    });
  });

  it('should certify an employee', async () => {
    await service.certify({ employeeId: 'e1', programId: 'p1' } as any);
    expect(prisma.certification.create).toHaveBeenCalledWith({
      data: { employeeId: 'e1', programId: 'p1', expiresAt: null },
    });
  });

  it('should get certifications including program', async () => {
    await service.getCertifications('e1');
    expect(prisma.certification.findMany).toHaveBeenCalledWith({
      where: { employeeId: 'e1' },
      include: { program: true },
    });
  });
});
