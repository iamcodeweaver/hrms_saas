import { IsOptional, IsString } from 'class-validator';

export class UpdatePerformanceReviewDto {
  @IsOptional()
  @IsString()
  comments?: string;
}
