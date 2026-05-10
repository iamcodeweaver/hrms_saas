import { IsOptional, IsEnum } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';

export class UpdateJobApplicationDto {
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}
