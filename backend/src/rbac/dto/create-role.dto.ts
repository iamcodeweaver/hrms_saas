import { IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name!: string;

  @IsUUID()
  companyId!: string;
}
