import { IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateCertificationDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  programId!: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
