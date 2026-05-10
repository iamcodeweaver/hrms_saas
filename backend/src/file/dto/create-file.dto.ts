import { IsUUID, IsString } from 'class-validator';

export class CreateFileDto {
  @IsUUID()
  companyId!: string;

  @IsString()
  name!: string;

  @IsString()
  url!: string;

  @IsUUID()
  employeeId?: string;
}
