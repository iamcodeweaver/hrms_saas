import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: {
        name: dto.name,
        companyId: dto.companyId,
      },
    });
  }

  findAll() {
    return this.prisma.department.findMany({
      include: { company: true, employees: true },
    });
  }

  findOne(id: string) {
    return this.prisma.department.findUnique({
      where: { id },
      include: { company: true, employees: true },
    });
  }

  update(id: string, dto: UpdateDepartmentDto) {
    return this.prisma.department.update({
      where: { id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.department.delete({ where: { id } });
  }
}
