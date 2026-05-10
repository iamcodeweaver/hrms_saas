import { Test, TestingModule } from '@nestjs/testing';
import { PayrollService } from './payroll.service';
import { PrismaService } from '../prisma.service';

describe('PayrollService', () => {
  let service: PayrollService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      payrollRun: { create: jest.fn(), findMany: jest.fn() },
      payroll: { create: jest.fn(), update: jest.fn(), findMany: jest.fn() },
      payrollItem: { create: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayrollService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<PayrollService>(PayrollService);
  });

  it('should create a payroll run', async () => {
    await service.createRun({ companyId: 'c1', periodStart: new Date().toISOString(), periodEnd: new Date().toISOString() } as any);
    expect(prisma.payrollRun.create).toHaveBeenCalled();
  });

  it('should get payroll runs', async () => {
    await service.getRuns('c1');
    expect(prisma.payrollRun.findMany).toHaveBeenCalledWith({ where: { companyId: 'c1' }, include: { payrolls: true } });
  });

  it('should create a payroll', async () => {
    await service.createPayroll({ employeeId: 'e1', companyId: 'c1', runId: 'r1', grossPay: 1000, netPay: 800, currency: 'NGN' } as any);
    expect(prisma.payroll.create).toHaveBeenCalled();
  });

  it('should update a payroll', async () => {
    await service.updatePayroll('p1', { netPay: 900 } as any);
    expect(prisma.payroll.update).toHaveBeenCalledWith({ where: { id: 'p1' }, data: { netPay: 900 } });
  });

  it('should get payrolls', async () => {
    await service.getPayrolls('c1');
    expect(prisma.payroll.findMany).toHaveBeenCalledWith({ where: { companyId: 'c1' }, include: { employee: true, items: true } });
  });

  it('should create a payroll item', async () => {
    await service.createItem({ payrollId: 'p1', type: 'EARNING', amount: 500 } as any);
    expect(prisma.payrollItem.create).toHaveBeenCalled();
  });
});
