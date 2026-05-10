import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { LoanStatus } from '@prisma/client';

export class UpdateLoanDto {
  @IsOptional()
  @IsEnum(LoanStatus)
  status?: LoanStatus;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
