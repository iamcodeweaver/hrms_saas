import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  companyId?: string; // ✅ matches schema
}
