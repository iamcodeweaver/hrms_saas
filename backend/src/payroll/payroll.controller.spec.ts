import { Test, TestingModule } from '@nestjs/testing';
import { PayrollController } from './payroll.controller';
import { PayrollService } from './payroll.service';

describe('PayrollController', () => {
  let controller: PayrollController;
  let service: PayrollService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollController],
      providers: [
        {
          provide: PayrollService,
          useValue: {
            createRun: jest.fn().mockResolvedValue({ id: 'r1' }),
            getRuns: jest.fn().mockResolvedValue([{ id: 'r1' }]),
            createPayroll: jest.fn().mockResolvedValue({ id: 'p1' }),
            updatePayroll: jest.fn().mockResolvedValue({ id: 'p1', netPay: 900 }),
            getPayrolls: jest.fn().mockResolvedValue([{ id: 'p1' }]),
            createItem: jest.fn().mockResolvedValue({ id: 'i1' }),
          },
        },
      ],
    }).compile();

    controller = module.get<PayrollController>(PayrollController);
    service = module.get<PayrollService>(PayrollService);
  });

  it('should create a payroll run', async () => {
    const dto = { companyId: 'c1', periodStart: new Date().toISOString(), periodEnd: new Date().toISOString() } as any;
    expect(await controller.createRun(dto)).toEqual({ id: 'r1' });
    expect(service.createRun).toHaveBeenCalledWith(dto);
  });

  it('should get payroll runs', async () => {
    expect(await controller.getRuns('c1')).toEqual([{ id: 'r1' }]);
    expect(service.getRuns).toHaveBeenCalledWith('c1');
  });

  it('should create a payroll', async () => {
    const dto = { employeeId: 'e1', companyId: 'c1', runId: 'r1', grossPay: 1000, netPay: 800, currency: 'NGN' } as any;
    expect(await controller.createPayroll(dto)).toEqual({ id: 'p1' });
    expect(service.createPayroll).toHaveBeenCalledWith(dto);
  });

  it('should update a payroll', async () => {
    const dto = { netPay: 900 } as any;
    expect(await controller.updatePayroll('p1', dto)).toEqual({ id: 'p1', netPay: 900 });
    expect(service.updatePayroll).toHaveBeenCalledWith('p1', dto);
  });

  it('should get payrolls by company', async () => {
    expect(await controller.getPayrolls('c1')).toEqual([{ id: 'p1' }]);
    expect(service.getPayrolls).toHaveBeenCalledWith('c1');
  });

  it('should create a payroll item', async () => {
    const dto = { payrollId: 'p1', type: 'EARNING', amount: 500 } as any;
    expect(await controller.createItem(dto)).toEqual({ id: 'i1' });
    expect(service.createItem).toHaveBeenCalledWith(dto);
  });
});
