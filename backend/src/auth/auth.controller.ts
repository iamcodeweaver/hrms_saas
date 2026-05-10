import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // ✅ Change Password (requires logged-in userId from request context)
  @Post('change-password')
  changePassword(
    @Req() req: any, // typically you’d use a custom decorator to extract userId from JWT
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(req.user.sub, body.oldPassword, body.newPassword);
  }

  // ✅ Forgot Password
  @Post('forgot-password')
  forgotPassword(@Body() body: { email: string; companyId: string }) {
    return this.authService.forgotPassword(body.email, body.companyId);
  }

  // ✅ Reset Password
  @Post('reset-password')
  resetPassword(@Body() body: { token: string; newPassword: string }) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }
}
