import { IsUUID, IsString, IsObject } from 'class-validator';

export class CreateReportDto {
  @IsUUID()
  companyId!: string;

  @IsString()
  title!: string;

  @IsString()
  type!: string;

  @IsObject()
  data!: object;
}
