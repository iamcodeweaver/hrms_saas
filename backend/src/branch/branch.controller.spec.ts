import { Test, TestingModule } from '@nestjs/testing';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';

describe('BranchController', () => {
  let controller: BranchController;

  const mockBranchService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchController],
      providers: [
        {
          provide: BranchService,
          useValue: mockBranchService,
        },
      ],
    }).compile();

    controller = module.get<BranchController>(BranchController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all branches', async () => {
      const branches = [
        {
          id: '1',
          name: 'Headquarters',
          address: 'Main Street',
        },
      ];

      mockBranchService.findAll.mockResolvedValue(branches);

      expect(await controller.findAll()).toEqual(branches);
      expect(mockBranchService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one branch', async () => {
      const branch = {
        id: '1',
        name: 'Headquarters',
        address: 'Main Street',
      };

      mockBranchService.findOne.mockResolvedValue(branch);

      expect(await controller.findOne('1')).toEqual(branch);
      expect(mockBranchService.findOne).toHaveBeenCalledWith('1');
    });
  });
});