import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateGoalDto {
  @IsUUID()
  employeeId!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
