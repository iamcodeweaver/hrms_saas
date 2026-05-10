import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const mockAppService = {
    getHello: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);

    jest.clearAllMocks();
  });

  describe('root', () => {
    it('should return "Backend is active!"', () => {
      mockAppService.getHello.mockReturnValue('Backend is active!');

      expect(appController.getHello()).toBe('Backend is active!');

      expect(mockAppService.getHello).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});