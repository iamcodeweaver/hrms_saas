import { IsUUID, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PayrollItemType } from '@prisma/client';

export class CreatePayrollItemDto {
  @IsUUID()
  payrollId!: string;

  @IsEnum(PayrollItemType)
  type!: PayrollItemType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  amount!: number;
}
