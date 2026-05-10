import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateRecruitmentStageDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
