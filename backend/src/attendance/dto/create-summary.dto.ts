// dto/create-summary.dto.ts
import { IsUUID, IsDate, IsOptional } from 'class-validator';

export class CreateSummaryDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  companyId!: string;

  @IsDate()
  periodStart!: Date;

  @IsDate()
  periodEnd!: Date;

  @IsOptional()
  totalPresent?: number;

  @IsOptional()
  totalAbsent?: number;

  @IsOptional()
  totalLate?: number;

  @IsOptional()
  totalHalfDay?: number;
}
