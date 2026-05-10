import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { AssignEmployeeShiftDto } from './dto/assign-employee-shift.dto';

@Injectable()
export class ShiftService {
  constructor(private prisma: PrismaService) {}

  createShift(dto: CreateShiftDto) {
    return this.prisma.shift.create({
      data: {
        companyId: dto.companyId,
        name: dto.name,
        type: dto.type,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
      },
    });
  }

  updateShift(id: string, dto: UpdateShiftDto) {
    return this.prisma.shift.update({
      where: { id },
      data: { ...dto },
    });
  }

  getShifts(companyId: string) {
    return this.prisma.shift.findMany({
      where: { companyId },
      include: { assignments: true },
    });
  }

  assignEmployee(dto: AssignEmployeeShiftDto) {
    return this.prisma.employeeShift.create({
      data: {
        employeeId: dto.employeeId,
        shiftId: dto.shiftId,
      },
    });
  }

  getEmployeeAssignments(employeeId: string) {
    return this.prisma.employeeShift.findMany({
      where: { employeeId },
      include: { shift: true },
    });
  }
}
