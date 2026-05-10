import { IsUUID, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { WalletTxnType } from '@prisma/client';

export class CreateTransactionDto {
  @IsUUID()
  walletId!: string;

  @IsUUID()
  companyId!: string;

  @IsEnum(WalletTxnType)
  type!: WalletTxnType;

  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsString()
  reference?: string;
}
