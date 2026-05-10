import { IsUUID, IsEnum, IsString } from 'class-validator';
import { NotificationType } from '@prisma/client';

export class CreateNotificationDto {
  @IsUUID()
  employeeId!: string;

  @IsEnum(NotificationType)
  type!: NotificationType;

    @IsString()
    companyId!: string;   // ✅ add this

  @IsString()
  message!: string;
}
