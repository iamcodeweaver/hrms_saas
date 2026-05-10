import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';
import { PrismaService } from '../prisma.service';

describe('LoanService', () => {
  let service: LoanService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      loan: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
  });

  it('should create a loan', async () => {
    await service.create({ employeeId: 'e1', companyId: 'c1', amount: 1000 } as any);
    expect(prisma.loan.create).toHaveBeenCalled();
  });

  it('should find all loans', async () => {
    await service.findAll('c1');
    expect(prisma.loan.findMany).toHaveBeenCalledWith({
      where: { companyId: 'c1' },
      include: { employee: true, company: true },
    });
  });

  it('should find one loan', async () => {
    await service.findOne('l1');
    expect(prisma.loan.findUnique).toHaveBeenCalledWith({
      where: { id: 'l1' },
      include: { employee: true, company: true },
    });
  });

  it('should update a loan', async () => {
    await service.update('l1', { status: 'APPROVED' } as any);
    expect(prisma.loan.update).toHaveBeenCalledWith({
      where: { id: 'l1' },
      data: { status: 'APPROVED' },
    });
  });

  it('should delete a loan', async () => {
    await service.remove('l1');
    expect(prisma.loan.delete).toHaveBeenCalledWith({ where: { id: 'l1' } });
  });
});
