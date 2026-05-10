import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationType } from '@prisma/client';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  @Get(':employeeId')
  findAll(@Param('employeeId') employeeId: string) {
    return this.notificationService.findAll(employeeId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
    return this.notificationService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(id);
  }

    @Post('broadcast/:companyId')
    broadcast(
    @Param('companyId') companyId: string,
    @Body() body: { message: string; type: NotificationType },
    ) {
    return this.notificationService.broadcastNotification(companyId, body.message, body.type);
    }

    @Patch('mark-all-read/:employeeId')
    markAllAsRead(@Param('employeeId') employeeId: string) {
    return this.notificationService.markAllAsRead(employeeId);
    }

    @Patch('mark-all-read/company/:companyId')
    markAllCompanyAsRead(@Param('companyId') companyId: string) {
    return this.notificationService.markAllCompanyAsRead(companyId);
    }


}
