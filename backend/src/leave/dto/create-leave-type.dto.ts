import { IsUUID, IsString } from 'class-validator';

export class CreateLeaveTypeDto {
  @IsString()
  name!: string;

  @IsUUID()
  companyId!: string;
}
