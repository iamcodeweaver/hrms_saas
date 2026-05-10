import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { RbacController } from './rbac.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [RbacController],
  providers: [RbacService, PrismaService],
})
export class RbacModule {}
