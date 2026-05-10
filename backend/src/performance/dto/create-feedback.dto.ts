import { IsUUID, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  reviewerId!: string;

  @IsString()
  message!: string;
}
