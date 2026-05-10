import { IsUUID, IsString, IsObject } from 'class-validator';

export class CreateIntegrationDto {
  @IsUUID()
  companyId!: string;

  @IsString()
  provider!: string;

  @IsObject()
  config!: object;
}
