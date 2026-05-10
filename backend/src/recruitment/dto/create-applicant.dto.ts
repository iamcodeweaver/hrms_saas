import { IsUUID, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateApplicantDto {
  @IsUUID()
  companyId!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @IsOptional()
  @IsString()
  portfolioUrl?: string;
}
