import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';
import { PrismaService } from '../prisma.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      report: { create: jest.fn(), findMany: jest.fn() },
      kPI: { create: jest.fn(), findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should create a report', async () => {
    await service.createReport({ companyId: 'c1', title: 'Payroll Summary', type: 'Payroll', data: { total: 1000 } } as any);
    expect(prisma.report.create).toHaveBeenCalledWith({
      data: {
        companyId: 'c1',
        title: 'Payroll Summary',
        type: 'Payroll',
        data: { total: 1000 },
      },
    });
  });

  it('should get reports', async () => {
    await service.getReports('c1');
    expect(prisma.report.findMany).toHaveBeenCalledWith({
      where: { companyId: 'c1' },
    });
  });

  it('should create a KPI', async () => {
    await service.createKpi({ companyId: 'c1', name: 'Attendance Rate', value: 95, period: 'Q1-2026' } as any);
    expect(prisma.kPI.create).toHaveBeenCalledWith({
      data: {
        companyId: 'c1',
        name: 'Attendance Rate',
        value: 95,
        period: 'Q1-2026',
      },
    });
  });

  it('should get KPIs', async () => {
    await service.getKpis('c1');
    expect(prisma.kPI.findMany).toHaveBeenCalledWith({
      where: { companyId: 'c1' },
    });
  });
});
