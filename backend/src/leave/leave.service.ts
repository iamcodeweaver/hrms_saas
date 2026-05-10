import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  createLeaveType(dto: CreateLeaveTypeDto) {
    return this.prisma.leaveType.create({
      data: { name: dto.name, companyId: dto.companyId },
    });
  }

  getLeaveTypes(companyId: string) {
    return this.prisma.leaveType.findMany({ where: { companyId } });
  }

  createLeaveRequest(dto: CreateLeaveRequestDto) {
    return this.prisma.leaveRequest.create({
      data: {
        employeeId: dto.employeeId,
        companyId: dto.companyId,
        leaveTypeId: dto.leaveTypeId,
        status: dto.status,
      },
    });
  }

  getLeaveRequests(companyId: string) {
    return this.prisma.leaveRequest.findMany({
      where: { companyId },
      include: { employee: true, leaveType: true, approvedBy: true },
    });
  }

  updateLeaveRequest(id: string, dto: UpdateLeaveRequestDto) {
    return this.prisma.leaveRequest.update({
      where: { id },
      data: { ...dto },
    });
  }
}
