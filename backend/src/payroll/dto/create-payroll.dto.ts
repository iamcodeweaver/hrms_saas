import { IsUUID, IsNumber, IsString } from 'class-validator';

export class CreatePayrollDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  companyId!: string;

  @IsUUID()
  runId!: string;

  @IsNumber()
  grossPay!: number;

  @IsNumber()
  netPay!: number;

  @IsString()
  currency!: string;
}
