import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { AssignEmployeeShiftDto } from './dto/assign-employee-shift.dto';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  createShift(@Body() dto: CreateShiftDto) {
    return this.shiftService.createShift(dto);
  }

  @Patch(':id')
  updateShift(@Param('id') id: string, @Body() dto: UpdateShiftDto) {
    return this.shiftService.updateShift(id, dto);
  }

  @Get('company/:companyId')
  getShifts(@Param('companyId') companyId: string) {
    return this.shiftService.getShifts(companyId);
  }

  @Post('assign')
  assignEmployee(@Body() dto: AssignEmployeeShiftDto) {
    return this.shiftService.assignEmployee(dto);
  }

  @Get('employee/:employeeId')
  getEmployeeAssignments(@Param('employeeId') employeeId: string) {
    return this.shiftService.getEmployeeAssignments(employeeId);
  }
}
