import { Module } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentController } from './recruitment.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [RecruitmentController],
  providers: [RecruitmentService, PrismaService],
})
export class RecruitmentModule {}
