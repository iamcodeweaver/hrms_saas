import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationService } from './integration.service';
import { PrismaService } from '../prisma.service';

describe('IntegrationService', () => {
  let service: IntegrationService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      integration: { create: jest.fn(), findMany: jest.fn() },
      webhook: { create: jest.fn(), findMany: jest.fn() },
      externalSync: { create: jest.fn(), findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrationService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<IntegrationService>(IntegrationService);
  });

  it('should create an integration', async () => {
    await service.createIntegration({ companyId: 'c1', provider: 'Paystack', config: { apiKey: '123' } } as any);
    expect(prisma.integration.create).toHaveBeenCalledWith({
      data: {
        companyId: 'c1',
        provider: 'Paystack',
        config: { apiKey: '123' },
      },
    });
  });

  it('should get integrations including webhooks and syncs', async () => {
    await service.getIntegrations('c1');
    expect(prisma.integration.findMany).toHaveBeenCalledWith({
      where: { companyId: 'c1' },
      include: { webhooks: true, syncs: true },
    });
  });

  it('should create a webhook', async () => {
    await service.createWebhook({ integrationId: 'i1', url: 'https://example.com', event: 'PAYROLL' } as any);
    expect(prisma.webhook.create).toHaveBeenCalledWith({
      data: { integrationId: 'i1', url: 'https://example.com', event: 'PAYROLL', secret: undefined },
    });
  });

  it('should get webhooks', async () => {
    await service.getWebhooks('i1');
    expect(prisma.webhook.findMany).toHaveBeenCalledWith({
      where: { integrationId: 'i1' },
    });
  });

  it('should create a sync', async () => {
    await service.createSync({ integrationId: 'i1', entity: 'Payroll', status: 'Success' } as any);
    expect(prisma.externalSync.create).toHaveBeenCalledWith({
      data: { integrationId: 'i1', entity: 'Payroll', status: 'Success' },
    });
  });

  it('should get syncs', async () => {
    await service.getSyncs('i1');
    expect(prisma.externalSync.findMany).toHaveBeenCalledWith({
      where: { integrationId: 'i1' },
    });
  });
});
