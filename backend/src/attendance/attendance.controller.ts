import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { CreateAttendanceSessionDto } from './dto/create-attendance-session.dto';
import { UpdateAttendanceLogDto } from './dto/update-attendance-log.dto';
import { CreateSummaryDto } from './dto/create-summary.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('log')
  logAttendance(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.logAttendance(dto);
  }

  @Patch('log/:id')
  updateAttendance(@Param('id') id: string, @Body() dto: UpdateAttendanceLogDto) {
    return this.attendanceService.updateAttendance(id, dto);
  }

  @Get('logs/:companyId')
  getLogs(@Param('companyId') companyId: string) {
    return this.attendanceService.getAttendanceLogs(companyId);
  }

  @Post('summary')
  createSummary(@Body() dto: CreateSummaryDto) {
    return this.attendanceService.createSummary(dto);
  }

  @Get('summaries/:companyId')
  getSummaries(@Param('companyId') companyId: string) {
    return this.attendanceService.getSummaries(companyId);
  }

  @Post('generate-summary/:employeeId/:companyId')
  generateSummary(
    @Param('employeeId') employeeId: string,
    @Param('companyId') companyId: string,
    @Body() body: { periodStart: string; periodEnd: string },
  ) {
    return this.attendanceService.generateSummary(
      employeeId,
      companyId,
      new Date(body.periodStart),
      new Date(body.periodEnd),
    );
  }

    @Post('clock-in')
    clockIn(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.clockIn(dto);
    }

    @Post('clock-out')
    clockOut(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.clockOut(dto);
    }

    @Post('session')
    createSession(@Body() dto: CreateAttendanceSessionDto) {
    return this.attendanceService.createSession(dto);
    }

    @Get('session/:id')
    getSession(@Param('id') id: string) {
    return this.attendanceService.getSession(id);
    }

}
