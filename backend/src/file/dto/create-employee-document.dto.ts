import { IsUUID, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDocumentDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  fileId!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
