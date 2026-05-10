import { IsUUID, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreatePolicyDto {
  @IsUUID()
  companyId!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  effectiveAt!: string;
}
