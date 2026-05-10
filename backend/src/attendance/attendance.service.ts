import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { CreateAttendanceSessionDto } from './dto/create-attendance-session.dto';
import { UpdateAttendanceLogDto } from './dto/update-attendance-log.dto';
import { CreateSummaryDto } from './dto/create-summary.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  // ✅ Log a punch (generic)
  async logAttendance(dto: CreateAttendanceDto) {
    return this.prisma.attendanceLog.create({
      data: {
        employeeId: dto.employeeId,
        companyId: dto.companyId,
        punchType: dto.punchType, // IN or OUT
        timestamp: dto.timestamp ? new Date(dto.timestamp) : new Date(),
        sessionId: dto.sessionId,
        deviceId: dto.deviceId,
        shiftId: dto.shiftId,
      },
    });
  }

  // ✅ Update a punch
  async updateAttendance(id: string, dto: UpdateAttendanceLogDto) {
    return this.prisma.attendanceLog.update({
      where: { id },
      data: { ...dto },
    });
  }

  // ✅ Get logs for a company
  async getAttendanceLogs(companyId: string) {
    return this.prisma.attendanceLog.findMany({
      where: { companyId },
      include: { employee: true, session: true, device: true, shift: true },
      orderBy: { timestamp: 'desc' },
    });
  }

  // ✅ Create a summary (period totals)
  async createSummary(dto: CreateSummaryDto) {
    return this.prisma.attendanceSummary.create({
      data: {
        employeeId: dto.employeeId,
        companyId: dto.companyId,
        periodStart: new Date(dto.periodStart),
        periodEnd: new Date(dto.periodEnd),
        totalPresent: dto.totalPresent ?? 0,
        totalAbsent: dto.totalAbsent ?? 0,
        totalLate: dto.totalLate ?? 0,
        totalHalfDay: dto.totalHalfDay ?? 0,
      },
    });
  }

  async getSummaries(companyId: string) {
    return this.prisma.attendanceSummary.findMany({
      where: { companyId },
      include: { employee: true },
    });
  }

  // ✅ Generate summary dynamically
  async generateSummary(employeeId: string, companyId: string, periodStart: Date, periodEnd: Date) {
    const logs = await this.prisma.attendanceLog.findMany({
      where: {
        employeeId,
        companyId,
        timestamp: { gte: periodStart, lte: periodEnd },
      },
    });

    const summary = {
      totalPresent: logs.filter(l => l.punchType === 'IN').length,
      totalAbsent: 0, // can be inferred differently if needed
      totalLate: 0,
      totalHalfDay: 0,
    };

    return this.prisma.attendanceSummary.create({
      data: {
        employeeId,
        companyId,
        periodStart,
        periodEnd,
        ...summary,
      },
    });
  }

  // ✅ Clock-in
  async clockIn(dto: CreateAttendanceDto) {
    const punch = await this.prisma.attendanceLog.create({
      data: {
        ...dto,
        punchType: 'IN',
        timestamp: dto.timestamp ? new Date(dto.timestamp) : new Date(),
      },
    });

    // Update session firstIn if not set
    if (dto.sessionId) {
      await this.prisma.attendanceSession.update({
        where: { id: dto.sessionId },
        data: {
          firstIn: punch.timestamp,
          totalEvents: { increment: 1 },
        },
      });
    }

    return punch;
  }

  // ✅ Clock-out
  async clockOut(dto: CreateAttendanceDto) {
    const punch = await this.prisma.attendanceLog.create({
      data: {
        ...dto,
        punchType: 'OUT',
        timestamp: dto.timestamp ? new Date(dto.timestamp) : new Date(),
      },
    });

    // Update session lastOut and totalHours
    if (dto.sessionId) {
      const session = await this.prisma.attendanceSession.findUnique({
        where: { id: dto.sessionId },
      });

      if (session?.firstIn) {
        const hours =
          (punch.timestamp.getTime() - new Date(session.firstIn).getTime()) /
          (1000 * 60 * 60);

        await this.prisma.attendanceSession.update({
          where: { id: dto.sessionId },
          data: {
            lastOut: punch.timestamp,
            totalHours: hours.toFixed(2),
            totalEvents: { increment: 1 },
          },
        });
      }
    }

    return punch;
  }

  // ✅ Create a session
  async createSession(dto: CreateAttendanceSessionDto) {
    return this.prisma.attendanceSession.create({
      data: {
        employeeId: dto.employeeId,
        companyId: dto.companyId,
        workDate: dto.workDate,
        firstIn: dto.firstIn,
        lastOut: dto.lastOut,
      },
    });
  }

  // ✅ Get a session with punches
  async getSession(id: string) {
    return this.prisma.attendanceSession.findUnique({
      where: { id },
      include: { punches: true },
    });
  }
}
