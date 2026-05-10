import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { LeaveStatus } from '@prisma/client';

export class UpdateLeaveRequestDto {
  @IsOptional()
  @IsEnum(LeaveStatus)
  status?: LeaveStatus;

  @IsOptional()
  @IsUUID()
  approvedById?: string;
}
