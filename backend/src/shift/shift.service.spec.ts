import { Test, TestingModule } from '@nestjs/testing';
import { ShiftService } from './shift.service';
import { PrismaService } from '../prisma.service';

describe('ShiftService', () => {
  let service: ShiftService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      shift: { create: jest.fn(), update: jest.fn(), findMany: jest.fn() },
      employeeShift: { create: jest.fn(), findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShiftService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ShiftService>(ShiftService);
  });

  it('should create a shift', async () => {
    await service.createShift({ companyId: 'c1', name: 'Morning', type: 'MORNING', startTime: new Date().toISOString(), endTime: new Date().toISOString() } as any);
    expect(prisma.shift.create).toHaveBeenCalled();
  });

  it('should update a shift', async () => {
    await service.updateShift('s1', { name: 'Updated' } as any);
    expect(prisma.shift.update).toHaveBeenCalledWith({ where: { id: 's1' }, data: { name: 'Updated' } });
  });

  it('should get shifts', async () => {
    await service.getShifts('c1');
    expect(prisma.shift.findMany).toHaveBeenCalledWith({ where: { companyId: 'c1' }, include: { assignments: true } });
  });

  it('should assign employee to shift', async () => {
    await service.assignEmployee({ employeeId: 'e1', shiftId: 's1' } as any);
    expect(prisma.employeeShift.create).toHaveBeenCalled();
  });

  it('should get employee assignments', async () => {
    await service.getEmployeeAssignments('e1');
    expect(prisma.employeeShift.findMany).toHaveBeenCalledWith({ where: { employeeId: 'e1' }, include: { shift: true } });
  });
});
