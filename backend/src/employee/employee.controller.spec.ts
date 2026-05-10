import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 'emp1' }),
            findAll: jest.fn().mockResolvedValue([{ id: 'emp1' }]),
            findOne: jest.fn().mockResolvedValue({ id: 'emp1' }),
            update: jest.fn().mockResolvedValue({ id: 'emp1', firstName: 'Jane' }),
            remove: jest.fn().mockResolvedValue({ id: 'emp1' }),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should create an employee', async () => {
    const dto = { employeeNo: 'E001', firstName: 'John', lastName: 'Doe', companyId: 'comp1' } as any;
    expect(await controller.create(dto)).toEqual({ id: 'emp1' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all employees', async () => {
    expect(await controller.findAll('comp1')).toEqual([{ id: 'emp1' }]);
    expect(service.findAll).toHaveBeenCalledWith('comp1');
  });

  it('should find one employee', async () => {
    expect(await controller.findOne('emp1')).toEqual({ id: 'emp1' });
    expect(service.findOne).toHaveBeenCalledWith('emp1');
  });

  it('should update an employee', async () => {
    const dto = { firstName: 'Jane' } as any;
    expect(await controller.update('emp1', dto)).toEqual({ id: 'emp1', firstName: 'Jane' });
    expect(service.update).toHaveBeenCalledWith('emp1', dto);
  });

  it('should delete an employee', async () => {
    expect(await controller.remove('emp1')).toEqual({ id: 'emp1' });
    expect(service.remove).toHaveBeenCalledWith('emp1');
  });
});
