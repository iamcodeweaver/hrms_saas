import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsUUID()
  companyId!: string;
}
