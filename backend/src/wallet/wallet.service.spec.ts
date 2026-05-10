import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { PrismaService } from '../prisma.service';

describe('WalletService', () => {
  let service: WalletService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      wallet: {
        create: jest.fn(),
        findUnique: jest.fn().mockResolvedValue({ id: 'w1', balance: { toNumber: () => 100 } }),
        update: jest.fn(),
      },
      walletTransaction: { create: jest.fn().mockResolvedValue({ id: 't1' }) },
      walletLedger: { create: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it('should create a wallet', async () => {
    await service.createWallet({ employeeId: 'e1', companyId: 'c1' });
    expect(prisma.wallet.create).toHaveBeenCalled();
  });

  it('should get a wallet', async () => {
    await service.getWallet('w1');
    expect(prisma.wallet.findUnique).toHaveBeenCalledWith({
      where: { id: 'w1' },
      include: { transactions: true, ledger: true, employee: true, company: true },
    });
  });

  it('should create a transaction and update balance', async () => {
    await service.createTransaction({
      walletId: 'w1',
      companyId: 'c1',
      type: 'CREDIT',
      amount: 50,
    } as any);
    expect(prisma.walletTransaction.create).toHaveBeenCalled();
    expect(prisma.walletLedger.create).toHaveBeenCalled();
    expect(prisma.wallet.update).toHaveBeenCalled();
  });
});
