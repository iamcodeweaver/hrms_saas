import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { PrismaService } from '../prisma.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      notification: {
        create: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should create a notification', async () => {
    await service.create({ employeeId: 'e1', type: 'INFO', message: 'Hello' } as any);
    expect(prisma.notification.create).toHaveBeenCalled();
  });

  it('should find all notifications', async () => {
    await service.findAll('e1');
    expect(prisma.notification.findMany).toHaveBeenCalledWith({
      where: { employeeId: 'e1' },
      orderBy: { createdAt: 'desc' },
    });
  });

  it('should update a notification', async () => {
    await service.update('n1', { read: true } as any);
    expect(prisma.notification.update).toHaveBeenCalledWith({
      where: { id: 'n1' },
      data: { read: true },
    });
  });

  it('should delete a notification', async () => {
    await service.remove('n1');
    expect(prisma.notification.delete).toHaveBeenCalledWith({ where: { id: 'n1' } });
  });
});
