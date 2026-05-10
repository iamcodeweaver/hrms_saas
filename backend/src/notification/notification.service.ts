import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({
        data: {
        employeeId: dto.employeeId,
        companyId: dto.companyId,   // ✅ include this
        type: dto.type,
        message: dto.message,
        },
    });
  }

  findAll(employeeId: string) {
    return this.prisma.notification.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  update(id: string, dto: UpdateNotificationDto) {
    return this.prisma.notification.update({
      where: { id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.notification.delete({ where: { id } });
  }

    async broadcastNotification(companyId: string, message: string, type: NotificationType) {
    const employees = await this.prisma.employee.findMany({ where: { companyId } });

    const notifications = employees.map(emp => ({
        employeeId: emp.id,
        companyId,
        type,
        message,
    }));

    return this.prisma.notification.createMany({ data: notifications });
    }

    async markAllAsRead(employeeId: string) {
    return this.prisma.notification.updateMany({
        where: { employeeId, read: false },
        data: { read: true },
    });
    }

    async markAllCompanyAsRead(companyId: string) {
    return this.prisma.notification.updateMany({
        where: { companyId, read: false },
        data: { read: true },
    });
    }

}
