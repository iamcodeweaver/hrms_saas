import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ✅ Register
  async register(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        companyId: dto.companyId,
      },
    });
    return { id: user.id, email: user.email };
  }

  // ✅ Login
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        companyId_email: {
          companyId: dto.companyId,
          email: dto.email,
        },
      },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      // increment failed attempts
      await this.prisma.user.update({
        where: { id: user.id },
        data: { failedLoginAttempts: { increment: 1 } },
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    // reset failed attempts
    await this.prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lastLoginAt: new Date() },
    });

    const payload = { sub: user.id, email: user.email, companyId: user.companyId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // ✅ Change Password (logged-in user)
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) throw new UnauthorizedException('Old password is incorrect');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        passwordChangedAt: new Date(),
      },
    });

    return { message: 'Password changed successfully' };
  }

  // ✅ Forgot Password (generate reset token)
  async forgotPassword(email: string, companyId: string) {
    const user = await this.prisma.user.findUnique({
      where: { companyId_email: { companyId, email } },
    });
    if (!user) throw new BadRequestException('User not found');

    const resetToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      { expiresIn: '15m' } // short-lived token
    );

    // Normally: send resetToken via email/SMS
    return { resetToken };
  }

  // ✅ Reset Password (using token)
  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const userId = payload.sub;

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
          passwordChangedAt: new Date(),
        },
      });

      return { message: 'Password reset successfully' };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
  }
}
