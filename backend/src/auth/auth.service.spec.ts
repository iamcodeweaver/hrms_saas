import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mock-jwt-token'),
            verifyAsync: jest.fn().mockResolvedValue({ sub: 'user-1', email: 'test@example.com' }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should register a new user', async () => {
    jest.spyOn(prisma.user, 'create').mockResolvedValue({
      id: 'user-1',
      email: 'test@example.com',
      password: 'hashed',
      companyId: 'company-1',
    } as any);

    const result = await service.register({
      email: 'test@example.com',
      password: 'password123',
      companyId: 'company-1',
    });

    expect(result).toEqual({ id: 'user-1', email: 'test@example.com' });
  });

  it('should login with valid credentials', async () => {
    const hashed = await bcrypt.hash('password123', 10);

    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
      id: 'user-1',
      email: 'test@example.com',
      password: hashed,
      companyId: 'company-1',
    } as any);

    jest.spyOn(prisma.user, 'update').mockResolvedValue({} as any);

    const result = await service.login({
      email: 'test@example.com',
      password: 'password123',
      companyId: 'company-1',
    });

    expect(result).toEqual({ access_token: 'mock-jwt-token' });
  });

  it('should throw on invalid login', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
    await expect(
      service.login({ email: 'bad@example.com', password: 'wrong', companyId: 'company-1' }),
    ).rejects.toThrow();
  });

  it('should change password', async () => {
    const hashed = await bcrypt.hash('oldpass', 10);
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
      id: 'user-1',
      password: hashed,
    } as any);

    jest.spyOn(prisma.user, 'update').mockResolvedValue({} as any);

    const result = await service.changePassword('user-1', 'oldpass', 'newpass');
    expect(result).toEqual({ message: 'Password changed successfully' });
  });
});
