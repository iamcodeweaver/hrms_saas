import { IsUUID, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateJobPositionDto {
  @IsUUID()
  companyId!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  expiresAt?: Date;
}
