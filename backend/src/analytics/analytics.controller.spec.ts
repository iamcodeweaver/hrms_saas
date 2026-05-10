import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsController', () => {
  let controller: AnalyticsController;
  let service: AnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [
        {
          provide: AnalyticsService,
          useValue: {
            createReport: jest.fn().mockResolvedValue({ id: 'r1' }),
            getReports: jest.fn().mockResolvedValue([{ id: 'r1', title: 'Payroll Summary' }]),
            createKpi: jest.fn().mockResolvedValue({ id: 'k1' }),
            getKpis: jest.fn().mockResolvedValue([{ id: 'k1', name: 'Attendance Rate' }]),
          },
        },
      ],
    }).compile();

    controller = module.get<AnalyticsController>(AnalyticsController);
    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should create a report', async () => {
    const dto = { companyId: 'c1', title: 'Payroll Summary', type: 'Payroll', data: { total: 1000 } } as any;
    expect(await controller.createReport(dto)).toEqual({ id: 'r1' });
    expect(service.createReport).toHaveBeenCalledWith(dto);
  });

  it('should get reports', async () => {
    expect(await controller.getReports('c1')).toEqual([{ id: 'r1', title: 'Payroll Summary' }]);
    expect(service.getReports).toHaveBeenCalledWith('c1');
  });

  it('should create a KPI', async () => {
    const dto = { companyId: 'c1', name: 'Attendance Rate', value: 95, period: 'Q1-2026' } as any;
    expect(await controller.createKpi(dto)).toEqual({ id: 'k1' });
    expect(service.createKpi).toHaveBeenCalledWith(dto);
  });

  it('should get KPIs', async () => {
    expect(await controller.getKpis('c1')).toEqual([{ id: 'k1', name: 'Attendance Rate' }]);
    expect(service.getKpis).toHaveBeenCalledWith('c1');
  });
});
