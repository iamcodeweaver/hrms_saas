import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { CreateAssetAssignmentDto } from './dto/create-asset-assignment.dto';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}

  createAsset(dto: CreateAssetDto) {
    return this.prisma.asset.create({
      data: {
        companyId: dto.companyId,
        name: dto.name,
        description: dto.description,
        category: dto.category,
        serialNo: dto.serialNo,
        purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : null,
        value: dto.value,
      },
    });
  }

  getAssets(companyId: string) {
    return this.prisma.asset.findMany({
      where: { companyId },
      include: { assignments: true },
    });
  }

  assignAsset(dto: CreateAssetAssignmentDto) {
    return this.prisma.assetAssignment.create({
      data: {
        assetId: dto.assetId,
        employeeId: dto.employeeId,
      },
    });
  }

  getAssignments(employeeId: string) {
    return this.prisma.assetAssignment.findMany({
      where: { employeeId },
      include: { asset: true },
    });
  }

  createInventoryItem(dto: CreateInventoryItemDto) {
    return this.prisma.inventoryItem.create({
      data: {
        companyId: dto.companyId,
        name: dto.name,
        description: dto.description,
        quantity: dto.quantity,
      },
    });
  }

  getInventory(companyId: string) {
    return this.prisma.inventoryItem.findMany({
      where: { companyId },
    });
  }
}
