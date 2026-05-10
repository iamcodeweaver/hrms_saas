import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

describe('CompanyController', () => {
  let controller: CompanyController;

  const mockCompanyService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all companies', async () => {
      const companies = [
        {
          id: '1',
          name: 'Demo Company',
          slug: 'demo-company',
        },
      ];

      mockCompanyService.findAll.mockResolvedValue(companies);

      expect(await controller.findAll()).toEqual(companies);
      expect(mockCompanyService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one company', async () => {
      const company = {
        id: '1',
        name: 'Demo Company',
        slug: 'demo-company',
      };

      mockCompanyService.findOne.mockResolvedValue(company);

      expect(await controller.findOne('1')).toEqual(company);
      expect(mockCompanyService.findOne).toHaveBeenCalledWith('1');
    });
  });
});