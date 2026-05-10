import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { CreateAcknowledgementDto } from './dto/create-acknowledgement.dto';
import { CreateAuditDto } from './dto/create-audit.dto';

@Injectable()
export class ComplianceService {
  constructor(private prisma: PrismaService) {}

  createPolicy(dto: CreatePolicyDto) {
    return this.prisma.policy.create({
      data: {
        companyId: dto.companyId,
        title: dto.title,
        description: dto.description,
        effectiveAt: new Date(dto.effectiveAt),
      },
    });
  }

  getPolicies(companyId: string) {
    return this.prisma.policy.findMany({
      where: { companyId },
      include: { acknowledgements: true, audits: true },
    });
  }

  acknowledge(dto: CreateAcknowledgementDto) {
    return this.prisma.acknowledgement.create({
      data: {
        employeeId: dto.employeeId,
        policyId: dto.policyId,
      },
    });
  }

  getAcknowledgements(policyId: string) {
    return this.prisma.acknowledgement.findMany({
      where: { policyId },
      include: { employee: true },
    });
  }

  audit(dto: CreateAuditDto) {
    return this.prisma.audit.create({
      data: {
        policyId: dto.policyId,
        actorId: dto.actorId,
        action: dto.action,
      },
    });
  }

  getAudits(policyId: string) {
    return this.prisma.audit.findMany({
      where: { policyId },
      include: { actor: true },
    });
  }
}
