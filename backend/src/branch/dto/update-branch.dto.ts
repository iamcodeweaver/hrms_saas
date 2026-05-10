import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateBranchDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsUUID()
  companyId?: string; // ✅ matches schema
}
