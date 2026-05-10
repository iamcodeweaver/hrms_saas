import { IsUUID, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateLoanDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  companyId!: string;

  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
