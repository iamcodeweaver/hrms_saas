import { IsUUID, IsString } from 'class-validator';

export class CreateAuditDto {
  @IsUUID()
  policyId!: string;

  @IsUUID()
  actorId!: string;

  @IsString()
  action!: string;
}
