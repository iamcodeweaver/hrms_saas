import { IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDocumentDto {
  @IsOptional()
  @IsString()
  description?: string;
}
