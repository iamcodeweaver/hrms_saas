import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateReportDto } from './dto/create-report.dto';
import { CreateKpiDto } from './dto/create-kpi.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('report')
  createReport(@Body() dto: CreateReportDto) {
    return this.analyticsService.createReport(dto);
  }

  @Get('reports/:companyId')
  getReports(@Param('companyId') companyId: string) {
    return this.analyticsService.getReports(companyId);
  }

  @Post('kpi')
  createKpi(@Body() dto: CreateKpiDto) {
    return this.analyticsService.createKpi(dto);
  }

  @Get('kpis/:companyId')
  getKpis(@Param('companyId') companyId: string) {
    return this.analyticsService.getKpis(companyId);
  }
}
