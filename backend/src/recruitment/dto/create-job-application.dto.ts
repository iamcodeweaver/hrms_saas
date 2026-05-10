import { IsUUID, IsEnum } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';

export class CreateJobApplicationDto {
  @IsUUID()
  companyId!: string;

  @IsUUID()
  applicantId!: string;

  @IsUUID()
  jobId!: string;

  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;
}
