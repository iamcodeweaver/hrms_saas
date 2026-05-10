import { Test, TestingModule } from '@nestjs/testing';
import { PositionService } from './position.service';
import { PrismaService } from '../prisma.service';

describe('PositionService', () => {
  let service: PositionService;
  let mockPrismaService: any;

  beforeEach(async () => {
    mockPrismaService = {
      position: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PositionService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PositionService>(PositionService);
  });

  it('should create a position', async () => {
    const dto = { title: 'Engineer', companyId: 'comp1' };
    await service.create(dto as any);
    expect(mockPrismaService.position.create).toHaveBeenCalled();
  });

  it('should return all positions', async () => {
    await service.findAll();
    expect(mockPrismaService.position.findMany).toHaveBeenCalledWith({
      include: { company: true, employees: true },
    });
  });

  it('should return one position', async () => {
    await service.findOne('1');
    expect(mockPrismaService.position.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      include: { company: true, employees: true },
    });
  });

  it('should update a position', async () => {
    await service.update('1', { title: 'UpdatedEngineer' } as any);
    expect(mockPrismaService.position.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { title: 'UpdatedEngineer' },
    });
  });

  it('should delete a position', async () => {
    await service.remove('1');
    expect(mockPrismaService.position.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
