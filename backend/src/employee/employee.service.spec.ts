import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { PrismaService } from '../prisma.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      employee: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should create an employee', async () => {
    await service.create({ employeeNo: 'E001', firstName: 'John', lastName: 'Doe', companyId: 'comp1' } as any);
    expect(prisma.employee.create).toHaveBeenCalled();
  });

  it('should find all employees', async () => {
    await service.findAll('comp1');
    expect(prisma.employee.findMany).toHaveBeenCalledWith({
      where: { companyId: 'comp1' },
      include: { branch: true, department: true, position: true, wallet: true },
    });
  });

  it('should find one employee', async () => {
    await service.findOne('emp1');
    expect(prisma.employee.findUnique).toHaveBeenCalledWith({
      where: { id: 'emp1' },
      include: expect.any(Object),
    });
  });

  it('should update an employee', async () => {
    await service.update('emp1', { firstName: 'Jane' } as any);
    expect(prisma.employee.update).toHaveBeenCalledWith({
      where: { id: 'emp1' },
      data: { firstName: 'Jane' },
    });
  });

  it('should delete an employee', async () => {
    await service.remove('emp1');
    expect(prisma.employee.delete).toHaveBeenCalledWith({ where: { id: 'emp1' } });
  });
});
