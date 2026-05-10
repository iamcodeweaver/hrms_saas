import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';

describe('IntegrationController', () => {
  let controller: IntegrationController;
  let service: IntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegrationController],
      providers: [
        {
          provide: IntegrationService,
          useValue: {
            createIntegration: jest.fn().mockResolvedValue({ id: 'i1' }),
            getIntegrations: jest.fn().mockResolvedValue([{ id: 'i1', provider: 'Paystack' }]),
            createWebhook: jest.fn().mockResolvedValue({ id: 'w1' }),
            getWebhooks: jest.fn().mockResolvedValue([{ id: 'w1', url: 'https://example.com' }]),
            createSync: jest.fn().mockResolvedValue({ id: 's1' }),
            getSyncs: jest.fn().mockResolvedValue([{ id: 's1', entity: 'Payroll' }]),
          },
        },
      ],
    }).compile();

    controller = module.get<IntegrationController>(IntegrationController);
    service = module.get<IntegrationService>(IntegrationService);
  });

  it('should create an integration', async () => {
    const dto = { companyId: 'c1', provider: 'Paystack', config: { apiKey: '123' } } as any;
    expect(await controller.createIntegration(dto)).toEqual({ id: 'i1' });
    expect(service.createIntegration).toHaveBeenCalledWith(dto);
  });

  it('should get integrations', async () => {
    expect(await controller.getIntegrations('c1')).toEqual([{ id: 'i1', provider: 'Paystack' }]);
    expect(service.getIntegrations).toHaveBeenCalledWith('c1');
  });

  it('should create a webhook', async () => {
    const dto = { integrationId: 'i1', url: 'https://example.com', event: 'PAYROLL' } as any;
    expect(await controller.createWebhook(dto)).toEqual({ id: 'w1' });
    expect(service.createWebhook).toHaveBeenCalledWith(dto);
  });

  it('should get webhooks', async () => {
    expect(await controller.getWebhooks('i1')).toEqual([{ id: 'w1', url: 'https://example.com' }]);
    expect(service.getWebhooks).toHaveBeenCalledWith('i1');
  });

  it('should create a sync', async () => {
    const dto = { integrationId: 'i1', entity: 'Payroll', status: 'Success' } as any;
    expect(await controller.createSync(dto)).toEqual({ id: 's1' });
    expect(service.createSync).toHaveBeenCalledWith(dto);
  });

  it('should get syncs', async () => {
    expect(await controller.getSyncs('i1')).toEqual([{ id: 's1', entity: 'Payroll' }]);
    expect(service.getSyncs).toHaveBeenCalledWith('i1');
  });
});
