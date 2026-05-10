import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceController } from './compliance.controller';
import { ComplianceService } from './compliance.service';

describe('ComplianceController', () => {
  let controller: ComplianceController;
  let service: ComplianceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplianceController],
      providers: [
        {
          provide: ComplianceService,
          useValue: {
            createPolicy: jest.fn().mockResolvedValue({ id: 'p1' }),
            getPolicies: jest.fn().mockResolvedValue([{ id: 'p1', acknowledgements: [], audits: [] }]),
            acknowledge: jest.fn().mockResolvedValue({ id: 'a1' }),
            getAcknowledgements: jest.fn().mockResolvedValue([{ id: 'a1', employee: { id: 'e1' } }]),
            audit: jest.fn().mockResolvedValue({ id: 'au1' }),
            getAudits: jest.fn().mockResolvedValue([{ id: 'au1', actor: { id: 'e1' } }]),
          },
        },
      ],
    }).compile();

    controller = module.get<ComplianceController>(ComplianceController);
    service = module.get<ComplianceService>(ComplianceService);
  });

  it('should create a policy', async () => {
    const dto = { companyId: 'c1', title: 'Code of Conduct', effectiveAt: '2026-05-10' } as any;
    expect(await controller.createPolicy(dto)).toEqual({ id: 'p1' });
    expect(service.createPolicy).toHaveBeenCalledWith(dto);
  });

  it('should get policies', async () => {
    expect(await controller.getPolicies('c1')).toEqual([{ id: 'p1', acknowledgements: [], audits: [] }]);
    expect(service.getPolicies).toHaveBeenCalledWith('c1');
  });

  it('should acknowledge a policy', async () => {
    const dto = { employeeId: 'e1', policyId: 'p1' } as any;
    expect(await controller.acknowledge(dto)).toEqual({ id: 'a1' });
    expect(service.acknowledge).toHaveBeenCalledWith(dto);
  });

  it('should get acknowledgements with employee', async () => {
    expect(await controller.getAcknowledgements('p1')).toEqual([{ id: 'a1', employee: { id: 'e1' } }]);
    expect(service.getAcknowledgements).toHaveBeenCalledWith('p1');
  });

  it('should create an audit', async () => {
    const dto = { policyId: 'p1', actorId: 'e1', action: 'Created' } as any;
    expect(await controller.audit(dto)).toEqual({ id: 'au1' });
    expect(service.audit).toHaveBeenCalledWith(dto);
  });

  it('should get audits with actor', async () => {
    expect(await controller.getAudits('p1')).toEqual([{ id: 'au1', actor: { id: 'e1' } }]);
    expect(service.getAudits).toHaveBeenCalledWith('p1');
  });
});
