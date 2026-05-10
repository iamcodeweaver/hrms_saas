import { IsUUID } from 'class-validator';

export class CreateAcknowledgementDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  policyId!: string;
}
