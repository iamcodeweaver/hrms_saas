import { Test, TestingModule } from '@nestjs/testing';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';

describe('PositionController', () => {
  let controller: PositionController;

  const mockPositionService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionController],
      providers: [
        {
          provide: PositionService,
          useValue: mockPositionService,
        },
      ],
    }).compile();

    controller = module.get<PositionController>(
      PositionController,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all positions', async () => {
      const positions = [
        {
          id: '1',
          title: 'Software Engineer',
        },
      ];

      mockPositionService.findAll.mockResolvedValue(
        positions,
      );

      expect(await controller.findAll()).toEqual(
        positions,
      );

      expect(
        mockPositionService.findAll,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one position', async () => {
      const position = {
        id: '1',
        title: 'Software Engineer',
      };

      mockPositionService.findOne.mockResolvedValue(
        position,
      );

      expect(await controller.findOne('1')).toEqual(
        position,
      );

      expect(
        mockPositionService.findOne,
      ).toHaveBeenCalledWith('1');
    });
  });
});