import { IsOptional, IsNumber } from 'class-validator';

export class UpdatePayrollDto {
  @IsOptional()
  @IsNumber()
  grossPay?: number;

  @IsOptional()
  @IsNumber()
  netPay?: number;
}
