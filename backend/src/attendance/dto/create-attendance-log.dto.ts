import { IsUUID, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { PunchType } from '@prisma/client';
import { AttendanceStatus } from '@prisma/client';

export class CreateAttendanceLogDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  companyId!: string;

  @IsEnum(PunchType)
  punchType!: PunchType; // IN or OUT

  @IsEnum(AttendanceStatus)
  status!: AttendanceStatus;

  @IsOptional()
  @IsDateString()
  timestamp?: string;
}
