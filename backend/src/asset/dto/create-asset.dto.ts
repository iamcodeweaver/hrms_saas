import { IsUUID, IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateAssetDto {
  @IsUUID()
  companyId!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  serialNo?: string;

  @IsOptional()
  @IsDateString()
  purchaseDate?: string;

  @IsOptional()
  @IsNumber()
  value?: number;
}
