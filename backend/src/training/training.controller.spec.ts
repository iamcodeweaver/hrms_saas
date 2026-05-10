import { Test, TestingModule } from '@nestjs/testing';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

describe('TrainingController', () => {
  let controller: TrainingController;
  let service: TrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingController],
      providers: [
        {
          provide: TrainingService,
          useValue: {
            createProgram: jest.fn().mockResolvedValue({ id: 'p1' }),
            getPrograms: jest.fn().mockResolvedValue([{ id: 'p1', enrollments: [], certifications: [] }]),
            enroll: jest.fn().mockResolvedValue({ id: 'en1' }),
            getEnrollments: jest.fn().mockResolvedValue([{ id: 'en1', employee: { id: 'e1' } }]),
            certify: jest.fn().mockResolvedValue({ id: 'c1' }),
            getCertifications: jest.fn().mockResolvedValue([{ id: 'c1', program: { id: 'p1' } }]),
          },
        },
      ],
    }).compile();

    controller = module.get<TrainingController>(TrainingController);
    service = module.get<TrainingService>(TrainingService);
  });

  it('should create a training program', async () => {
    const dto = { companyId: 'c1', title: 'Leadership', startDate: '2026-05-10' } as any;
    expect(await controller.createProgram(dto)).toEqual({ id: 'p1' });
    expect(service.createProgram).toHaveBeenCalledWith(dto);
  });

  it('should get programs', async () => {
    expect(await controller.getPrograms('c1')).toEqual([{ id: 'p1', enrollments: [], certifications: [] }]);
    expect(service.getPrograms).toHaveBeenCalledWith('c1');
  });

  it('should enroll an employee', async () => {
    const dto = { employeeId: 'e1', programId: 'p1' } as any;
    expect(await controller.enroll(dto)).toEqual({ id: 'en1' });
    expect(service.enroll).toHaveBeenCalledWith(dto);
  });

  it('should get enrollments with employee', async () => {
    expect(await controller.getEnrollments('p1')).toEqual([{ id: 'en1', employee: { id: 'e1' } }]);
    expect(service.getEnrollments).toHaveBeenCalledWith('p1');
  });

  it('should certify an employee', async () => {
    const dto = { employeeId: 'e1', programId: 'p1' } as any;
    expect(await controller.certify(dto)).toEqual({ id: 'c1' });
    expect(service.certify).toHaveBeenCalledWith(dto);
  });

  it('should get certifications with program', async () => {
    expect(await controller.getCertifications('e1')).toEqual([{ id: 'c1', program: { id: 'p1' } }]);
    expect(service.getCertifications).toHaveBeenCalledWith('e1');
  });
});
