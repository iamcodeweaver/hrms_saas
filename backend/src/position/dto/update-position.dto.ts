import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePositionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsUUID()
  companyId?: string; // ✅ matches schema
}
