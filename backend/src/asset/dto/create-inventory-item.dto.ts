import { IsUUID, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateInventoryItemDto {
  @IsUUID()
  companyId!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  quantity!: number;
}
