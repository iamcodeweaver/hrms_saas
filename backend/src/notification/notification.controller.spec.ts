import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

describe('NotificationController', () => {
  let controller: NotificationController;
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 'n1' }),
            findAll: jest.fn().mockResolvedValue([{ id: 'n1' }]),
            update: jest.fn().mockResolvedValue({ id: 'n1', read: true }),
            remove: jest.fn().mockResolvedValue({ id: 'n1' }),
          },
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    service = module.get<NotificationService>(NotificationService);
  });

  it('should create a notification', async () => {
    const dto = { employeeId: 'e1', type: 'INFO', message: 'Hello' } as any;
    expect(await controller.create(dto)).toEqual({ id: 'n1' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should get notifications', async () => {
    expect(await controller.findAll('e1')).toEqual([{ id: 'n1' }]);
    expect(service.findAll).toHaveBeenCalledWith('e1');
  });

  it('should update a notification', async () => {
    const dto = { read: true } as any;
    expect(await controller.update('n1', dto)).toEqual({ id: 'n1', read: true });
    expect(service.update).toHaveBeenCalledWith('n1', dto);
  });

  it('should delete a notification', async () => {
    expect(await controller.remove('n1')).toEqual({ id: 'n1' });
    expect(service.remove).toHaveBeenCalledWith('n1');
  });
});
