import { Test, TestingModule } from '@nestjs/testing';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';

describe('LeaveController', () => {
  let controller: LeaveController;
  let service: LeaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveController],
      providers: [
        {
          provide: LeaveService,
          useValue: {
            createLeaveType: jest.fn().mockResolvedValue({ id: 'lt1' }),
            getLeaveTypes: jest.fn().mockResolvedValue([{ id: 'lt1' }]),
            createLeaveRequest: jest.fn().mockResolvedValue({ id: 'lr1' }),
            getLeaveRequests: jest.fn().mockResolvedValue([{ id: 'lr1' }]),
            updateLeaveRequest: jest.fn().mockResolvedValue({ id: 'lr1', status: 'APPROVED' }),
          },
        },
      ],
    }).compile();

    controller = module.get<LeaveController>(LeaveController);
    service = module.get<LeaveService>(LeaveService);
  });

  it('should create a leave type', async () => {
    const dto = { name: 'Annual', companyId: 'c1' } as any;
    expect(await controller.createLeaveType(dto)).toEqual({ id: 'lt1' });
    expect(service.createLeaveType).toHaveBeenCalledWith(dto);
  });

  it('should get leave types', async () => {
    expect(await controller.getLeaveTypes('c1')).toEqual([{ id: 'lt1' }]);
    expect(service.getLeaveTypes).toHaveBeenCalledWith('c1');
  });

  it('should create a leave request', async () => {
    const dto = { employeeId: 'e1', companyId: 'c1', leaveTypeId: 'lt1', status: 'PENDING' } as any;
    expect(await controller.createLeaveRequest(dto)).toEqual({ id: 'lr1' });
    expect(service.createLeaveRequest).toHaveBeenCalledWith(dto);
  });

  it('should get leave requests', async () => {
    expect(await controller.getLeaveRequests('c1')).toEqual([{ id: 'lr1' }]);
    expect(service.getLeaveRequests).toHaveBeenCalledWith('c1');
  });

  it('should update a leave request', async () => {
    const dto = { status: 'APPROVED' } as any;
    expect(await controller.updateLeaveRequest('lr1', dto)).toEqual({ id: 'lr1', status: 'APPROVED' });
    expect(service.updateLeaveRequest).toHaveBeenCalledWith('lr1', dto);
  });
});
