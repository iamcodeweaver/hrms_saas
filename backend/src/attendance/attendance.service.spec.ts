// attendance.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';
import { PrismaService } from '../prisma.service';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendanceService, PrismaService],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should log a clock-in punch', async () => {
    const dto = {
      employeeId: 'emp-123',
      companyId: 'comp-123',
      punchType: 'IN',
    };

    prisma.attendanceLog.create = jest.fn().mockResolvedValue({ id: 'log-1', ...dto });

    const result = await service.clockIn(dto as any);
    expect(result.punchType).toBe('IN');
    expect(prisma.attendanceLog.create).toHaveBeenCalled();
  });

  it('should log a clock-out punch and update session', async () => {
    const dto = {
      employeeId: 'emp-123',
      companyId: 'comp-123',
      punchType: 'OUT',
      sessionId: 'sess-123',
    };

    prisma.attendanceLog.create = jest.fn().mockResolvedValue({ id: 'log-2', ...dto, timestamp: new Date() });
    prisma.attendanceSession.findUnique = jest.fn().mockResolvedValue({ id: 'sess-123', firstIn: new Date() });
    prisma.attendanceSession.update = jest.fn().mockResolvedValue({ id: 'sess-123', lastOut: new Date(), totalHours: 10 });

    const result = await service.clockOut(dto as any);
    expect(result.punchType).toBe('OUT');
    expect(prisma.attendanceSession.update).toHaveBeenCalled();
  });

  it('should create a new session', async () => {
    const dto = {
      employeeId: 'emp-123',
      companyId: 'comp-123',
      workDate: new Date(),
    };

    prisma.attendanceSession.create = jest.fn().mockResolvedValue({ id: 'sess-1', ...dto });

    const result = await service.createSession(dto as any);
    expect(result.id).toBe('sess-1');
    expect(prisma.attendanceSession.create).toHaveBeenCalled();
  });
});
