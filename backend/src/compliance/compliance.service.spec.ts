import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceService } from './compliance.service';
import { PrismaService } from '../prisma.service';

describe('ComplianceService', () => {
  let service: ComplianceService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      policy: { create: jest.fn(), findMany: jest.fn() },
      acknowledgement: { create: jest.fn(), findMany: jest.fn() },
      audit: { create: jest.fn(), findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComplianceService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ComplianceService>(ComplianceService);
  });

  it('should create a policy', async () => {
    await service.createPolicy({ companyId: 'c1', title: 'Code of Conduct', effectiveAt: '2026-05-10' } as any);
    expect(prisma.policy.create).toHaveBeenCalledWith({
      data: {
        companyId: 'c1',
        title: 'Code of Conduct',
        description: undefined,
        effectiveAt: new Date('2026-05-10'),
      },
    });
  });

  it('should get policies including acknowledgements and audits', async () => {
    await service.getPolicies('c1');
    expect(prisma.policy.findMany).toHaveBeenCalledWith({
      where: { companyId: 'c1' },
      include: { acknowledgements: true, audits: true },
    });
  });

  it('should create an acknowledgement', async () => {
    await service.acknowledge({ employeeId: 'e1', policyId: 'p1' } as any);
    expect(prisma.acknowledgement.create).toHaveBeenCalledWith({
      data: { employeeId: 'e1', policyId: 'p1' },
    });
  });

  it('should get acknowledgements including employee', async () => {
    await service.getAcknowledgements('p1');
    expect(prisma.acknowledgement.findMany).toHaveBeenCalledWith({
      where: { policyId: 'p1' },
      include: { employee: true },
    });
  });

  it('should create an audit', async () => {
    await service.audit({ policyId: 'p1', actorId: 'e1', action: 'Created' } as any);
    expect(prisma.audit.create).toHaveBeenCalledWith({
      data: { policyId: 'p1', actorId: 'e1', action: 'Created' },
    });
  });

  it('should get audits including actor', async () => {
    await service.getAudits('p1');
    expect(prisma.audit.findMany).toHaveBeenCalledWith({
      where: { policyId: 'p1' },
      include: { actor: true },
    });
  });
});
