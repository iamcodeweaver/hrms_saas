import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AssetController],
  providers: [AssetService, PrismaService],
})
export class AssetModule {}
