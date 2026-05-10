import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  key!: string;
}
