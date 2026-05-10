import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  createWallet(@Body() dto: CreateWalletDto) {
    return this.walletService.createWallet(dto);
  }

  @Get(':id')
  getWallet(@Param('id') id: string) {
    return this.walletService.getWallet(id);
  }

  @Post('transactions')
  createTransaction(@Body() dto: CreateTransactionDto) {
    return this.walletService.createTransaction(dto);
  }
}
