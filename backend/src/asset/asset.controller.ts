import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { CreateAssetAssignmentDto } from './dto/create-asset-assignment.dto';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  createAsset(@Body() dto: CreateAssetDto) {
    return this.assetService.createAsset(dto);
  }

  @Get(':companyId')
  getAssets(@Param('companyId') companyId: string) {
    return this.assetService.getAssets(companyId);
  }

  @Post('assign')
  assignAsset(@Body() dto: CreateAssetAssignmentDto) {
    return this.assetService.assignAsset(dto);
  }

  @Get('assignments/:employeeId')
  getAssignments(@Param('employeeId') employeeId: string) {
    return this.assetService.getAssignments(employeeId);
  }

  @Post('inventory')
  createInventoryItem(@Body() dto: CreateInventoryItemDto) {
    return this.assetService.createInventoryItem(dto);
  }

  @Get('inventory/:companyId')
  getInventory(@Param('companyId') companyId: string) {
    return this.assetService.getInventory(companyId);
  }
}
