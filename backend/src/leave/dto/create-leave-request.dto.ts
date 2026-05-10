import { IsUUID, IsEnum } from 'class-validator';
import { LeaveStatus } from '@prisma/client';

export class CreateLeaveRequestDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  companyId!: string;

  @IsUUID()
  leaveTypeId!: string;

  @IsEnum(LeaveStatus)
  status!: LeaveStatus;
}
