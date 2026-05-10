import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import { PrismaService } from '../prisma.service';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let mockPrismaService: any;

  beforeEach(async () => {
    mockPrismaService = {
      department: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
  });

  it('should create a department', async () => {
    const dto = { name: 'Dept1', companyId: 'comp1' };
    await service.create(dto as any);
    expect(mockPrismaService.department.create).toHaveBeenCalled();
  });

  it('should return all departments', async () => {
    await service.findAll();
    expect(mockPrismaService.department.findMany).toHaveBeenCalledWith({
      include: { company: true, employees: true },
    });
  });

  it('should return one department', async () => {
    await service.findOne('1');
    expect(mockPrismaService.department.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      include: { company: true, employees: true },
    });
  });

  it('should update a department', async () => {
    await service.update('1', { name: 'UpdatedDept' } as any);
    expect(mockPrismaService.department.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { name: 'UpdatedDept' },
    });
  });

  it('should delete a department', async () => {
    await service.remove('1');
    expect(mockPrismaService.department.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
