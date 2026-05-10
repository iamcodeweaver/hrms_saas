import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'testsecret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, PrismaService],
    }).compile();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
    expect(module.get(AuthService)).toBeInstanceOf(AuthService);
    expect(module.get(AuthController)).toBeInstanceOf(AuthController);
  });
});
