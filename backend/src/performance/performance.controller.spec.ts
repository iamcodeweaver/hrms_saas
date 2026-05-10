import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceController } from './performance.controller';
import { PerformanceService } from './performance.service';

describe('PerformanceController', () => {
  let controller: PerformanceController;
  let service: PerformanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformanceController],
      providers: [
        {
          provide: PerformanceService,
          useValue: {
            createReview: jest.fn().mockResolvedValue({ id: 'rev1' }),
            updateReview: jest.fn().mockResolvedValue({ id: 'rev1', comments: 'Updated comment' }),
            getReviews: jest.fn().mockResolvedValue([{ id: 'rev1', employee: { id: 'e1' }, reviewer: { id: 'r1' } }]),
            createGoal: jest.fn().mockResolvedValue({ id: 'g1' }),
            updateGoal: jest.fn().mockResolvedValue({ id: 'g1', title: 'Updated goal' }),
            getGoals: jest.fn().mockResolvedValue([{ id: 'g1', employee: { id: 'e1' } }]),
            createFeedback: jest.fn().mockResolvedValue({ id: 'f1' }),
            getFeedback: jest.fn().mockResolvedValue([{ id: 'f1', employee: { id: 'e1' }, reviewer: { id: 'r1' } }]),
          },
        },
      ],
    }).compile();

    controller = module.get<PerformanceController>(PerformanceController);
    service = module.get<PerformanceService>(PerformanceService);
  });

  it('should create a performance review', async () => {
    const dto = { employeeId: 'e1', reviewerId: 'r1', period: 'Q1', comments: 'Good work' } as any;
    expect(await controller.createReview(dto)).toEqual({ id: 'rev1' });
    expect(service.createReview).toHaveBeenCalledWith(dto);
  });

  it('should update a performance review', async () => {
    const dto = { comments: 'Updated comment' } as any;
    expect(await controller.updateReview('rev1', dto)).toEqual({ id: 'rev1', comments: 'Updated comment' });
    expect(service.updateReview).toHaveBeenCalledWith('rev1', dto);
  });

  it('should get reviews with employee and reviewer', async () => {
    const result = await controller.getReviews('e1');
    expect(result).toEqual([{ id: 'rev1', employee: { id: 'e1' }, reviewer: { id: 'r1' } }]);
    expect(service.getReviews).toHaveBeenCalledWith('e1');
  });

  it('should create a goal', async () => {
    const dto = { employeeId: 'e1', title: 'Increase sales', description: 'Target 20% growth' } as any;
    expect(await controller.createGoal(dto)).toEqual({ id: 'g1' });
    expect(service.createGoal).toHaveBeenCalledWith(dto);
  });

  it('should update a goal', async () => {
    const dto = { title: 'Updated goal' } as any;
    expect(await controller.updateGoal('g1', dto)).toEqual({ id: 'g1', title: 'Updated goal' });
    expect(service.updateGoal).toHaveBeenCalledWith('g1', dto);
  });

  it('should get goals with employee', async () => {
    const result = await controller.getGoals('e1');
    expect(result).toEqual([{ id: 'g1', employee: { id: 'e1' } }]);
    expect(service.getGoals).toHaveBeenCalledWith('e1');
  });

  it('should create feedback', async () => {
    const dto = { employeeId: 'e1', reviewerId: 'r1', message: 'Excellent performance' } as any;
    expect(await controller.createFeedback(dto)).toEqual({ id: 'f1' });
    expect(service.createFeedback).toHaveBeenCalledWith(dto);
  });

  it('should get feedback with employee and reviewer', async () => {
    const result = await controller.getFeedback('e1');
    expect(result).toEqual([{ id: 'f1', employee: { id: 'e1' }, reviewer: { id: 'r1' } }]);
    expect(service.getFeedback).toHaveBeenCalledWith('e1');
  });
});
