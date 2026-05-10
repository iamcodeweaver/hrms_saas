import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { PrismaService } from '../prisma.service';

describe('AssetService', () => {
  let service: AssetService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      asset: { create: jest.fn(), findMany: jest.fn() },
      assetAssignment: { create: jest.fn(), findMany: jest.fn() },
      inventoryItem: { create: jest.fn(), findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<AssetService>(AssetService);
  });

  it('should create an asset', async () => {
    await service.createAsset({ companyId: 'c1', name: 'Laptop' } as any);
    expect(prisma.asset.create).toHaveBeenCalledWith({
      data: {
        companyId: 'c1',
        name: 'Laptop',
        description: undefined,
        category: undefined,
        serialNo: undefined,
        purchaseDate: null,
        value: undefined,
      },
    });
  });

  it('should get assets including assignments', async () => {
    await service.getAssets('c1');
    expect(prisma.asset.findMany).toHaveBeenCalledWith({
      where: { companyId: 'c1' },
      include: { assignments: true },
    });
  });

  it('should assign an asset to employee', async () => {
    await service.assignAsset({ assetId: 'a1', employeeId: 'e1' } as any);
    expect(prisma.assetAssignment.create).toHaveBeenCalledWith({
      data: { assetId: 'a1', employeeId: 'e1' },
    });
  });

  it('should get assignments including asset', async () => {
    await service.getAssignments('e1');
    expect(prisma.assetAssignment.findMany).toHaveBeenCalledWith({
      where: { employeeId: 'e1' },
      include: { asset: true },
    });
  });

  it('should create an inventory item', async () => {
    await service.createInventoryItem({ companyId: 'c1', name: 'Mouse', quantity: 10 } as any);
    expect(prisma.inventoryItem.create).toHaveBeenCalledWith({
      data: { companyId: 'c1', name: 'Mouse', description: undefined, quantity: 10 },
    });
  });

  it('should get inventory items', async () => {
    await service.getInventory('c1');
    expect(prisma.inventoryItem.findMany).toHaveBeenCalledWith({
      where: { companyId: 'c1' },
    });
  });
});
