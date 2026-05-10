import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post('types')
  createLeaveType(@Body() dto: CreateLeaveTypeDto) {
    return this.leaveService.createLeaveType(dto);
  }

  @Get('types/:companyId')
  getLeaveTypes(@Param('companyId') companyId: string) {
    return this.leaveService.getLeaveTypes(companyId);
  }

  @Post('requests')
  createLeaveRequest(@Body() dto: CreateLeaveRequestDto) {
    return this.leaveService.createLeaveRequest(dto);
  }

  @Get('requests/:companyId')
  getLeaveRequests(@Param('companyId') companyId: string) {
    return this.leaveService.getLeaveRequests(companyId);
  }

  @Patch('requests/:id')
  updateLeaveRequest(@Param('id') id: string, @Body() dto: UpdateLeaveRequestDto) {
    return this.leaveService.updateLeaveRequest(id, dto);
  }
}
