import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateExternalSyncDto {
  @IsUUID()
  integrationId!: string;

  @IsString()
  entity!: string;

  @IsOptional()
  @IsString()
  status?: string;
}
