import { IsUUID } from 'class-validator';

export class CreateEnrollmentDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  programId!: string;
}
