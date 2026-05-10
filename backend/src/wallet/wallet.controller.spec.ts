import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

describe('WalletController', () => {
  let controller: WalletController;
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: WalletService,
          useValue: {
            createWallet: jest.fn().mockResolvedValue({ id: 'w1' }),
            getWallet: jest.fn().mockResolvedValue({ id: 'w1', balance: 100 }),
            createTransaction: jest.fn().mockResolvedValue({ id: 't1' }),
          },
        },
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    service = module.get<WalletService>(WalletService);
  });

  it('should create a wallet', async () => {
    const dto = { employeeId: 'e1', companyId: 'c1' } as any;
    expect(await controller.createWallet(dto)).toEqual({ id: 'w1' });
    expect(service.createWallet).toHaveBeenCalledWith(dto);
  });

  it('should get a wallet', async () => {
    expect(await controller.getWallet('w1')).toEqual({ id: 'w1', balance: 100 });
    expect(service.getWallet).toHaveBeenCalledWith('w1');
  });

  it('should create a transaction', async () => {
    const dto = { walletId: 'w1', companyId: 'c1', type: 'CREDIT', amount: 50 } as any;
    expect(await controller.createTransaction(dto)).toEqual({ id: 't1' });
    expect(service.createTransaction).toHaveBeenCalledWith(dto);
  });
});
