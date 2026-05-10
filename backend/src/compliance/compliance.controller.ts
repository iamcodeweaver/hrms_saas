import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { CreateAcknowledgementDto } from './dto/create-acknowledgement.dto';
import { CreateAuditDto } from './dto/create-audit.dto';

@Controller('compliance')
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Post('policy')
  createPolicy(@Body() dto: CreatePolicyDto) {
    return this.complianceService.createPolicy(dto);
  }

  @Get('policies/:companyId')
  getPolicies(@Param('companyId') companyId: string) {
    return this.complianceService.getPolicies(companyId);
  }

  @Post('acknowledge')
  acknowledge(@Body() dto: CreateAcknowledgementDto) {
    return this.complianceService.acknowledge(dto);
  }

  @Get('acknowledgements/:policyId')
  getAcknowledgements(@Param('policyId') policyId: string) {
    return this.complianceService.getAcknowledgements(policyId);
  }

  @Post('audit')
  audit(@Body() dto: CreateAuditDto) {
    return this.complianceService.audit(dto);
  }

  @Get('audits/:policyId')
  getAudits(@Param('policyId') policyId: string) {
    return this.complianceService.getAudits(policyId);
  }
}
