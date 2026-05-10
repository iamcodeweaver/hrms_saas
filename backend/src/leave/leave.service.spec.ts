import { Test, TestingModule } from '@nestjs/testing';
import { LeaveService } from './leave.service';
import { PrismaService } from '../prisma.service';

describe('LeaveService', () => {
  let service: LeaveService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      leaveType: { create: jest.fn(), findMany: jest.fn() },
      leaveRequest: { create: jest.fn(), findMany: jest.fn(), update: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeaveService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<LeaveService>(LeaveService);
  });

  it('should create a leave type', async () => {
    await service.createLeaveType({ name: 'Annual', companyId: 'c1' });
    expect(prisma.leaveType.create).toHaveBeenCalled();
  });

  it('should get leave types', async () => {
    await service.getLeaveTypes('c1');
    expect(prisma.leaveType.findMany).toHaveBeenCalledWith({ where: { companyId: 'c1' } });
  });

  it('should create a leave request', async () => {
    await service.createLeaveRequest({ employeeId: 'e1', companyId: 'c1', leaveTypeId: 'lt1', status: 'PENDING' } as any);
    expect(prisma.leaveRequest.create).toHaveBeenCalled();
  });

  it('should get leave requests', async () => {
    await service.getLeaveRequests('c1');
    expect(prisma.leaveRequest.findMany).toHaveBeenCalledWith({
      where: { companyId: 'c1' },
      include: { employee: true, leaveType: true, approvedBy: true },
    });
  });

  it('should update a leave request', async () => {
    await service.updateLeaveRequest('lr1', { status: 'APPROVED' } as any);
    expect(prisma.leaveRequest.update).toHaveBeenCalledWith({
      where: { id: 'lr1' },
      data: { status: 'APPROVED' },
    });
  });
});
