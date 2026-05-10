import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePayrollRunDto } from './dto/create-payroll-run.dto';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { CreatePayrollItemDto } from './dto/create-payroll-item.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  createRun(dto: CreatePayrollRunDto) {
    return this.prisma.payrollRun.create({
      data: {
        companyId: dto.companyId,
        periodStart: new Date(dto.periodStart),
        periodEnd: new Date(dto.periodEnd),
      },
    });
  }

  getRuns(companyId: string) {
    return this.prisma.payrollRun.findMany({
      where: { companyId },
      include: { payrolls: true },
    });
  }

  createPayroll(dto: CreatePayrollDto) {
    return this.prisma.payroll.create({
      data: {
        employeeId: dto.employeeId,
        companyId: dto.companyId,
        runId: dto.runId,
        grossPay: dto.grossPay,
        netPay: dto.netPay,
        currency: dto.currency,
      },
    });
  }

  updatePayroll(id: string, dto: UpdatePayrollDto) {
    return this.prisma.payroll.update({
      where: { id },
      data: { ...dto },
    });
  }

  getPayrolls(companyId: string) {
    return this.prisma.payroll.findMany({
      where: { companyId },
      include: { employee: true, items: true },
    });
  }

  createItem(dto: CreatePayrollItemDto) {
    return this.prisma.payrollItem.create({
      data: { ...dto },
    });
  }
}
