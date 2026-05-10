import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { ShiftType } from '@prisma/client';

export class UpdateShiftDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(ShiftType)
  type?: ShiftType;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;
}
