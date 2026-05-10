import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBranchDto) {
    return this.prisma.branch.create({
      data: {
        name: dto.name,
        address: dto.address,
        companyId: dto.companyId,
      },
    });
  }

  findAll() {
    return this.prisma.branch.findMany({
      include: { company: true, employees: true },
    });
  }

  findOne(id: string) {
    return this.prisma.branch.findUnique({
      where: { id },
      include: { company: true, employees: true },
    });
  }

  update(id: string, dto: UpdateBranchDto) {
    return this.prisma.branch.update({
      where: { id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.branch.delete({ where: { id } });
  }
}
