import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: { ...dto },
    });
  }

  findAll(companyId: string) {
    return this.prisma.employee.findMany({
      where: { companyId },
      include: { branch: true, department: true, position: true, wallet: true },
    });
  }

  findOne(id: string) {
    return this.prisma.employee.findUnique({
      where: { id },
      include: {
        company: true,
        branch: true,
        department: true,
        position: true,
        wallet: true,
        attendance: true,
        leaveRequests: true,
        loans: true,
        documents: true,
      },
    });
  }

  update(id: string, dto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
