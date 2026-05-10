import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { CreateExternalSyncDto } from './dto/create-external-sync.dto';

@Controller('integrations')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post()
  createIntegration(@Body() dto: CreateIntegrationDto) {
    return this.integrationService.createIntegration(dto);
  }

  @Get(':companyId')
  getIntegrations(@Param('companyId') companyId: string) {
    return this.integrationService.getIntegrations(companyId);
  }

  @Post('webhook')
  createWebhook(@Body() dto: CreateWebhookDto) {
    return this.integrationService.createWebhook(dto);
  }

  @Get('webhooks/:integrationId')
  getWebhooks(@Param('integrationId') integrationId: string) {
    return this.integrationService.getWebhooks(integrationId);
  }

  @Post('sync')
  createSync(@Body() dto: CreateExternalSyncDto) {
    return this.integrationService.createSync(dto);
  }

  @Get('syncs/:integrationId')
  getSyncs(@Param('integrationId') integrationId: string) {
    return this.integrationService.getSyncs(integrationId);
  }
}
