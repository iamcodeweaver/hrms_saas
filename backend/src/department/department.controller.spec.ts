import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';

describe('DepartmentController', () => {
  let controller: DepartmentController;

  const mockDepartmentService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        {
          provide: DepartmentService,
          useValue: mockDepartmentService,
        },
      ],
    }).compile();

    controller = module.get<DepartmentController>(
      DepartmentController,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all departments', async () => {
      const departments = [
        {
          id: '1',
          name: 'Human Resources',
        },
      ];

      mockDepartmentService.findAll.mockResolvedValue(
        departments,
      );

      expect(await controller.findAll()).toEqual(departments);
      expect(
        mockDepartmentService.findAll,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one department', async () => {
      const department = {
        id: '1',
        name: 'Human Resources',
      };

      mockDepartmentService.findOne.mockResolvedValue(
        department,
      );

      expect(await controller.findOne('1')).toEqual(
        department,
      );

      expect(
        mockDepartmentService.findOne,
      ).toHaveBeenCalledWith('1');
    });
  });
});