// attendance.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';

describe('AttendanceController', () => {
  let controller: AttendanceController;
  let service: AttendanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceController],
      providers: [
        {
          provide: AttendanceService,
          useValue: {
            clockIn: jest.fn(),
            clockOut: jest.fn(),
            createSession: jest.fn(),
            getSession: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AttendanceController>(AttendanceController);
    service = module.get<AttendanceService>(AttendanceService);
  });

  it('should call service.clockIn', async () => {
    const dto = { employeeId: 'emp-123', companyId: 'comp-123', punchType: 'IN' };
    (service.clockIn as jest.Mock).mockResolvedValue({ id: 'log-1', ...dto });

    const result = await controller.clockIn(dto as any);
    expect(result.id).toBe('log-1');
    expect(service.clockIn).toHaveBeenCalledWith(dto);
  });

  it('should call service.createSession', async () => {
    const dto = { employeeId: 'emp-123', companyId: 'comp-123', workDate: new Date() };
    (service.createSession as jest.Mock).mockResolvedValue({ id: 'sess-1', ...dto });

    const result = await controller.createSession(dto as any);
    expect(result.id).toBe('sess-1');
    expect(service.createSession).toHaveBeenCalledWith(dto);
  });
});
