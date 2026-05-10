import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateWebhookDto {
  @IsUUID()
  integrationId!: string;

  @IsString()
  url!: string;

  @IsString()
  event!: string;

  @IsOptional()
  @IsString()
  secret?: string;
}
