import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  createWallet(dto: CreateWalletDto) {
    return this.prisma.wallet.create({
      data: {
        employeeId: dto.employeeId,
        companyId: dto.companyId,
      },
    });
  }

  getWallet(id: string) {
    return this.prisma.wallet.findUnique({
      where: { id },
      include: { transactions: true, ledger: true, employee: true, company: true },
    });
  }

  async createTransaction(dto: CreateTransactionDto) {
    const wallet = await this.prisma.wallet.findUnique({ where: { id: dto.walletId } });
    if (!wallet) throw new Error('Wallet not found');

    const transaction = await this.prisma.walletTransaction.create({
      data: {
        walletId: dto.walletId,
        companyId: dto.companyId,
        type: dto.type,
        amount: dto.amount,
        reference: dto.reference,
      },
    });

    const balanceBefore = wallet.balance.toNumber();
    const balanceAfter =
      dto.type === 'CREDIT' ? balanceBefore + dto.amount : balanceBefore - dto.amount;

    await this.prisma.walletLedger.create({
      data: {
        walletId: dto.walletId,
        companyId: dto.companyId,
        transactionId: transaction.id,
        debit: dto.type === 'DEBIT' ? dto.amount : 0,
        credit: dto.type === 'CREDIT' ? dto.amount : 0,
        balanceBefore,
        balanceAfter,
        reference: dto.reference,
        narration: `${dto.type} transaction`,
      },
    });

    await this.prisma.wallet.update({
      where: { id: dto.walletId },
      data: { balance: balanceAfter },
    });

    return transaction;
  }
}
