import { Test, TestingModule } from '@nestjs/testing';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';

describe('ShiftController', () => {
  let controller: ShiftController;
  let service: ShiftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShiftController],
      providers: [
        {
          provide: ShiftService,
          useValue: {
            createShift: jest.fn().mockResolvedValue({ id: 's1' }),
            updateShift: jest.fn().mockResolvedValue({ id: 's1', name: 'Updated' }),
            getShifts: jest.fn().mockResolvedValue([{ id: 's1' }]),
            assignEmployee: jest.fn().mockResolvedValue({ id: 'es1' }),
            getEmployeeAssignments: jest.fn().mockResolvedValue([{ id: 'es1' }]),
          },
        },
      ],
    }).compile();

    controller = module.get<ShiftController>(ShiftController);
    service = module.get<ShiftService>(ShiftService);
  });

  it('should create a shift', async () => {
    const dto = { companyId: 'c1', name: 'Morning', type: 'MORNING', startTime: new Date().toISOString(), endTime: new Date().toISOString() } as any;
    expect(await controller.createShift(dto)).toEqual({ id: 's1' });
    expect(service.createShift).toHaveBeenCalledWith(dto);
  });

  it('should update a shift', async () => {
    const dto = { name: 'Updated' } as any;
    expect(await controller.updateShift('s1', dto)).toEqual({ id: 's1', name: 'Updated' });
    expect(service.updateShift).toHaveBeenCalledWith('s1', dto);
  });

  it('should get shifts by company', async () => {
    expect(await controller.getShifts('c1')).toEqual([{ id: 's1' }]);
    expect(service.getShifts).toHaveBeenCalledWith('c1');
  });

  it('should assign an employee to a shift', async () => {
    const dto = { employeeId: 'e1', shiftId: 's1' } as any;
    expect(await controller.assignEmployee(dto)).toEqual({ id: 'es1' });
    expect(service.assignEmployee).toHaveBeenCalledWith(dto);
  });

  it('should get employee assignments', async () => {
    expect(await controller.getEmployeeAssignments('e1')).toEqual([{ id: 'es1' }]);
    expect(service.getEmployeeAssignments).toHaveBeenCalledWith('e1');
  });
});
