import { Test, TestingModule } from '@nestjs/testing';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';

describe('LoanController', () => {
  let controller: LoanController;
  let service: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [
        {
          provide: LoanService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 'l1' }),
            findAll: jest.fn().mockResolvedValue([{ id: 'l1' }]),
            findOne: jest.fn().mockResolvedValue({ id: 'l1' }),
            update: jest.fn().mockResolvedValue({ id: 'l1', status: 'APPROVED' }),
            remove: jest.fn().mockResolvedValue({ id: 'l1' }),
          },
        },
      ],
    }).compile();

    controller = module.get<LoanController>(LoanController);
    service = module.get<LoanService>(LoanService);
  });

  it('should create a loan', async () => {
    const dto = { employeeId: 'e1', companyId: 'c1', amount: 1000 } as any;
    expect(await controller.create(dto)).toEqual({ id: 'l1' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all loans', async () => {
    expect(await controller.findAll('c1')).toEqual([{ id: 'l1' }]);
    expect(service.findAll).toHaveBeenCalledWith('c1');
  });

  it('should find one loan', async () => {
    expect(await controller.findOne('l1')).toEqual({ id: 'l1' });
    expect(service.findOne).toHaveBeenCalledWith('l1');
  });

  it('should update a loan', async () => {
    const dto = { status: 'APPROVED' } as any;
    expect(await controller.update('l1', dto)).toEqual({ id: 'l1', status: 'APPROVED' });
    expect(service.update).toHaveBeenCalledWith('l1', dto);
  });

  it('should delete a loan', async () => {
    expect(await controller.remove('l1')).toEqual({ id: 'l1' });
    expect(service.remove).toHaveBeenCalledWith('l1');
  });
});
