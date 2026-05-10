import { IsUUID } from 'class-validator';

export class CreateWalletDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  companyId!: string;
}
