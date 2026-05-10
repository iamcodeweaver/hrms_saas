import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn().mockResolvedValue({ id: 'user-1', email: 'test@example.com' }),
            login: jest.fn().mockResolvedValue({ access_token: 'mock-jwt-token' }),
            changePassword: jest.fn().mockResolvedValue({ message: 'Password changed successfully' }),
            forgotPassword: jest.fn().mockResolvedValue({ resetToken: 'reset-token' }),
            resetPassword: jest.fn().mockResolvedValue({ message: 'Password reset successfully' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should register user', async () => {
    const result = await controller.register({
      email: 'test@example.com',
      password: 'password123',
      companyId: 'company-1',
    });
    expect(result).toEqual({ id: 'user-1', email: 'test@example.com' });
    expect(service.register).toHaveBeenCalled();
  });

  it('should login user', async () => {
    const result = await controller.login({
      email: 'test@example.com',
      password: 'password123',
      companyId: 'company-1',
    });
    expect(result).toEqual({ access_token: 'mock-jwt-token' });
    expect(service.login).toHaveBeenCalled();
  });

  it('should change password', async () => {
    const result = await controller.changePassword(
      { user: { sub: 'user-1' } } as any,
      { oldPassword: 'oldpass', newPassword: 'newpass' },
    );
    expect(result).toEqual({ message: 'Password changed successfully' });
    expect(service.changePassword).toHaveBeenCalledWith('user-1', 'oldpass', 'newpass');
  });

  it('should forgot password', async () => {
    const result = await controller.forgotPassword({
      email: 'test@example.com',
      companyId: 'company-1',
    });
    expect(result).toEqual({ resetToken: 'reset-token' });
    expect(service.forgotPassword).toHaveBeenCalledWith('test@example.com', 'company-1');
  });

  it('should reset password', async () => {
    const result = await controller.resetPassword({
      token: 'reset-token',
      newPassword: 'newpass',
    });
    expect(result).toEqual({ message: 'Password reset successfully' });
    expect(service.resetPassword).toHaveBeenCalledWith('reset-token', 'newpass');
  });
});
