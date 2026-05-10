import { Test, TestingModule } from '@nestjs/testing';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

describe('AssetController', () => {
  let controller: AssetController;
  let service: AssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      providers: [
        {
          provide: AssetService,
          useValue: {
            createAsset: jest.fn().mockResolvedValue({ id: 'a1' }),
            getAssets: jest.fn().mockResolvedValue([{ id: 'a1', assignments: [] }]),
            assignAsset: jest.fn().mockResolvedValue({ id: 'as1' }),
            getAssignments: jest.fn().mockResolvedValue([{ id: 'as1', asset: { id: 'a1' } }]),
            createInventoryItem: jest.fn().mockResolvedValue({ id: 'i1' }),
            getInventory: jest.fn().mockResolvedValue([{ id: 'i1', name: 'Mouse' }]),
          },
        },
      ],
    }).compile();

    controller = module.get<AssetController>(AssetController);
    service = module.get<AssetService>(AssetService);
  });

  it('should create an asset', async () => {
    const dto = { companyId: 'c1', name: 'Laptop' } as any;
    expect(await controller.createAsset(dto)).toEqual({ id: 'a1' });
    expect(service.createAsset).toHaveBeenCalledWith(dto);
  });

  it('should get assets', async () => {
    expect(await controller.getAssets('c1')).toEqual([{ id: 'a1', assignments: [] }]);
    expect(service.getAssets).toHaveBeenCalledWith('c1');
  });

  it('should assign an asset', async () => {
    const dto = { assetId: 'a1', employeeId: 'e1' } as any;
    expect(await controller.assignAsset(dto)).toEqual({ id: 'as1' });
    expect(service.assignAsset).toHaveBeenCalledWith(dto);
  });

  it('should get assignments with asset', async () => {
    expect(await controller.getAssignments('e1')).toEqual([{ id: 'as1', asset: { id: 'a1' } }]);
    expect(service.getAssignments).toHaveBeenCalledWith('e1');
  });

  it('should create an inventory item', async () => {
    const dto = { companyId: 'c1', name: 'Mouse', quantity: 10 } as any;
    expect(await controller.createInventoryItem(dto)).toEqual({ id: 'i1' });
    expect(service.createInventoryItem).toHaveBeenCalledWith(dto);
  });

  it('should get inventory items', async () => {
    expect(await controller.getInventory('c1')).toEqual([{ id: 'i1', name: 'Mouse' }]);
    expect(service.getInventory).toHaveBeenCalledWith('c1');
  });
});
