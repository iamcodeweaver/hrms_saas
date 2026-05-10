import { IsUUID, IsString, IsEnum, IsDateString } from 'class-validator';
import { ShiftType } from '@prisma/client';

export class CreateShiftDto {
  @IsUUID()
  companyId!: string;

  @IsString()
  name!: string;

  @IsEnum(ShiftType)
  type!: ShiftType;

  @IsDateString()
  startTime!: string;

  @IsDateString()
  endTime!: string;
}
