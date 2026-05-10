import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLoanDto) {
    return this.prisma.loan.create({
      data: {
        employeeId: dto.employeeId,
        companyId: dto.companyId,
        amount: dto.amount,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      },
    });
  }

  findAll(companyId: string) {
    return this.prisma.loan.findMany({
      where: { companyId },
      include: { employee: true, company: true },
    });
  }

  findOne(id: string) {
    return this.prisma.loan.findUnique({
      where: { id },
      include: { employee: true, company: true },
    });
  }

  update(id: string, dto: UpdateLoanDto) {
    return this.prisma.loan.update({
      where: { id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.loan.delete({ where: { id } });
  }
}
