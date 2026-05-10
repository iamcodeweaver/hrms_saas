// dto/update-attendance-log.dto.ts
import { IsEnum, IsOptional, IsDate, IsUUID } from 'class-validator';
import { PunchType } from '@prisma/client';

export class UpdateAttendanceLogDto {
  @IsOptional()
  @IsEnum(PunchType)
  punchType?: PunchType;

  @IsOptional()
  @IsDate()
  timestamp?: Date;

  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @IsOptional()
  @IsUUID()
  deviceId?: string;

  @IsOptional()
  @IsUUID()
  shiftId?: string;
}