import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { PrismaService } from '../prisma.service';

describe('CompanyService', () => {
  let service: CompanyService;
  let mockPrismaService: any;

  beforeEach(async () => {
    mockPrismaService = {
      company: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should create a company', async () => {
    const dto = { name: 'TestCo', slug: 'testco' };
    await service.create(dto as any);
    expect(mockPrismaService.company.create).toHaveBeenCalled();
  });

  it('should return all companies', async () => {
    await service.findAll();
    expect(mockPrismaService.company.findMany).toHaveBeenCalledWith({
      include: { branches: true, departments: true, positions: true },
    });
  });

  it('should return one company', async () => {
    await service.findOne('1');
    expect(mockPrismaService.company.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      include: { branches: true, departments: true, positions: true },
    });
  });

  it('should update a company', async () => {
    await service.update('1', { name: 'UpdatedCo' } as any);
    expect(mockPrismaService.company.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { name: 'UpdatedCo' },
    });
  });

  it('should delete a company', async () => {
    await service.remove('1');
    expect(mockPrismaService.company.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
