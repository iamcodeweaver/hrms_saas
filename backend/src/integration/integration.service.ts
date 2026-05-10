import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { CreateExternalSyncDto } from './dto/create-external-sync.dto';

@Injectable()
export class IntegrationService {
  constructor(private prisma: PrismaService) {}

  createIntegration(dto: CreateIntegrationDto) {
    return this.prisma.integration.create({
      data: {
        companyId: dto.companyId,
        provider: dto.provider,
        config: dto.config,
      },
    });
  }

  getIntegrations(companyId: string) {
    return this.prisma.integration.findMany({
      where: { companyId },
      include: { webhooks: true, syncs: true },
    });
  }

  createWebhook(dto: CreateWebhookDto) {
    return this.prisma.webhook.create({
      data: {
        integrationId: dto.integrationId,
        url: dto.url,
        event: dto.event,
        secret: dto.secret,
      },
    });
  }

  getWebhooks(integrationId: string) {
    return this.prisma.webhook.findMany({
      where: { integrationId },
    });
  }

  createSync(dto: CreateExternalSyncDto) {
    return this.prisma.externalSync.create({
      data: {
        integrationId: dto.integrationId,
        entity: dto.entity,
        status: dto.status,
      },
    });
  }

  getSyncs(integrationId: string) {
    return this.prisma.externalSync.findMany({
      where: { integrationId },
    });
  }
}
