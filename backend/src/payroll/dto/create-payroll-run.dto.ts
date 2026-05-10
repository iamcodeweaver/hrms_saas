import { IsUUID, IsDateString } from 'class-validator';

export class CreatePayrollRunDto {
  @IsUUID()
  companyId!: string;

  @IsDateString()
  periodStart!: string;

  @IsDateString()
  periodEnd!: string;
}
