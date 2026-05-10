import { IsUUID } from 'class-validator';

export class AssignEmployeeShiftDto {
  @IsUUID()
  employeeId!: string;

  @IsUUID()
  shiftId!: string;
}
