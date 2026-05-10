import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { CreateKpiDto } from './dto/create-kpi.dto';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  createReport(dto: CreateReportDto) {
    return this.prisma.report.create({
      data: {
        companyId: dto.companyId,
        title: dto.title,
        type: dto.type,
        data: dto.data,
      },
    });
  }

  getReports(companyId: string) {
    return this.prisma.report.findMany({
      where: { companyId },
    });
  }

  createKpi(dto: CreateKpiDto) {
    return this.prisma.kPI.create({
      data: {
        companyId: dto.companyId,
        name: dto.name,
        value: dto.value,
        period: dto.period,
      },
    });
  }

  getKpis(companyId: string) {
    return this.prisma.kPI.findMany({
      where: { companyId },
    });
  }
}
