// dto/create-attendance-session.dto.ts
import { IsUUID, IsDate, IsOptional } from 'class-validator';

export class CreateAttendanceSessionDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  companyId!: string;

  @IsDate()
  workDate!: Date; // Date the shift started

  @IsOptional()
  @IsDate()
  firstIn?: Date;

  @IsOptional()
  @IsDate()
  lastOut?: Date;
}
