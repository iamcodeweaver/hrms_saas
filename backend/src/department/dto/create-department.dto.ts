import { IsString, IsUUID } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name!: string;

  @IsUUID()
  companyId!: string; // ✅ matches schema
}
