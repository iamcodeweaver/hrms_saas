import { Test, TestingModule } from '@nestjs/testing';
import { BranchService } from './branch.service';
import { PrismaService } from '../prisma.service';

describe('BranchService', () => {
  let service: BranchService;
  let mockPrismaService: any;

  beforeEach(async () => {
    mockPrismaService = {
      branch: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BranchService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<BranchService>(BranchService);
  });

  it('should create a branch', async () => {
    const dto = { name: 'Branch1', companyId: 'comp1' };
    await service.create(dto as any);
    expect(mockPrismaService.branch.create).toHaveBeenCalled();
  });

  it('should return all branches', async () => {
    await service.findAll();
    expect(mockPrismaService.branch.findMany).toHaveBeenCalledWith({
      include: { company: true, employees: true },
    });
  });

  it('should return one branch', async () => {
    await service.findOne('1');
    expect(mockPrismaService.branch.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      include: { company: true, employees: true },
    });
  });

  it('should update a branch', async () => {
    await service.update('1', { name: 'UpdatedBranch' } as any);
    expect(mockPrismaService.branch.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { name: 'UpdatedBranch' },
    });
  });

  it('should delete a branch', async () => {
    await service.remove('1');
    expect(mockPrismaService.branch.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
