import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreatePerformanceReviewDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  reviewerId!: string;

  @IsString()
  period!: string;

  @IsOptional()
  @IsString()
  comments?: string;
}
