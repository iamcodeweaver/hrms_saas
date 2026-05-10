import { IsUUID, IsString, IsNumber } from 'class-validator';

export class CreateKpiDto {
  @IsUUID()
  companyId!: string;

  @IsString()
  name!: string;

  @IsNumber()
  value!: number;

  @IsString()
  period!: string;
}
