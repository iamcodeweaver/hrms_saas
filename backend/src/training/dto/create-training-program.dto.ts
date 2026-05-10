import { IsUUID, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTrainingProgramDto {
  @IsUUID()
  companyId!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startDate!: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
