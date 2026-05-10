// dto/create-attendance.dto.ts
import { IsUUID, IsEnum, IsOptional, IsDate } from 'class-validator';
import { PunchType } from '@prisma/client';

export class CreateAttendanceDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  companyId!: string;

  @IsEnum(PunchType)
  punchType!: PunchType; // IN or OUT

  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @IsOptional()
  @IsUUID()
  deviceId?: string;

  @IsOptional()
  @IsUUID()
  shiftId?: string;

  @IsOptional()
  @IsDate()
  timestamp?: Date;
}
