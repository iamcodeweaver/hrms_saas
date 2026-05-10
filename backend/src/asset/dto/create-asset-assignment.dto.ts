import { IsUUID } from 'class-validator';

export class CreateAssetAssignmentDto {
  @IsUUID()
  assetId!: string;

  @IsUUID()
  employeeId!: string;
}
