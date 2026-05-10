import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceService } from './performance.service';
import { PrismaService } from '../prisma.service';

describe('PerformanceService', () => {
  let service: PerformanceService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      performanceReview: { create: jest.fn(), update: jest.fn(), findMany: jest.fn() },
      goal: { create: jest.fn(), update: jest.fn(), findMany: jest.fn() },
      feedback: { create: jest.fn(), findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerformanceService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<PerformanceService>(PerformanceService);
  });

  it('should create a performance review', async () => {
    await service.createReview({ employeeId: 'e1', reviewerId: 'r1', period: 'Q1', comments: 'Good work' } as any);
    expect(prisma.performanceReview.create).toHaveBeenCalledWith({
      data: { employeeId: 'e1', reviewerId: 'r1', period: 'Q1', comments: 'Good work' },
    });
  });

  it('should update a performance review', async () => {
    await service.updateReview('rev1', { comments: 'Updated comment' } as any);
    expect(prisma.performanceReview.update).toHaveBeenCalledWith({
      where: { id: 'rev1' },
      data: { comments: 'Updated comment' },
    });
  });

  it('should get reviews including employee and reviewer', async () => {
    await service.getReviews('e1');
    expect(prisma.performanceReview.findMany).toHaveBeenCalledWith({
      where: { employeeId: 'e1' },
      include: { employee: true, reviewer: true },
    });
  });

  it('should create a goal', async () => {
    await service.createGoal({ employeeId: 'e1', title: 'Increase sales', description: 'Target 20% growth' } as any);
    expect(prisma.goal.create).toHaveBeenCalledWith({
      data: { employeeId: 'e1', title: 'Increase sales', description: 'Target 20% growth' },
    });
  });

  it('should update a goal', async () => {
    await service.updateGoal('g1', { title: 'Updated goal' } as any);
    expect(prisma.goal.update).toHaveBeenCalledWith({
      where: { id: 'g1' },
      data: { title: 'Updated goal' },
    });
  });

  it('should get goals including employee', async () => {
    await service.getGoals('e1');
    expect(prisma.goal.findMany).toHaveBeenCalledWith({
      where: { employeeId: 'e1' },
      include: { employee: true },
    });
  });

  it('should create feedback', async () => {
    await service.createFeedback({ employeeId: 'e1', reviewerId: 'r1', message: 'Excellent performance' } as any);
    expect(prisma.feedback.create).toHaveBeenCalledWith({
      data: { employeeId: 'e1', reviewerId: 'r1', message: 'Excellent performance' },
    });
  });

  it('should get feedback including employee and reviewer', async () => {
    await service.getFeedback('e1');
    expect(prisma.feedback.findMany).toHaveBeenCalledWith({
      where: { employeeId: 'e1' },
      include: { employee: true, reviewer: true },
    });
  });
});
