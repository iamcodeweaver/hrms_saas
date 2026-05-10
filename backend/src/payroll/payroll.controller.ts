import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollRunDto } from './dto/create-payroll-run.dto';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { CreatePayrollItemDto } from './dto/create-payroll-item.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post('runs')
  createRun(@Body() dto: CreatePayrollRunDto) {
    return this.payrollService.createRun(dto);
  }

  @Get('runs/:companyId')
  getRuns(@Param('companyId') companyId: string) {
    return this.payrollService.getRuns(companyId);
  }

  @Post()
  createPayroll(@Body() dto: CreatePayrollDto) {
    return this.payrollService.createPayroll(dto);
  }

  @Patch(':id')
  updatePayroll(@Param('id') id: string, @Body() dto: UpdatePayrollDto) {
    return this.payrollService.updatePayroll(id, dto);
  }

  @Get('company/:companyId')
  getPayrolls(@Param('companyId') companyId: string) {
    return this.payrollService.getPayrolls(companyId);
  }

  @Post('items')
  createItem(@Body() dto: CreatePayrollItemDto) {
    return this.payrollService.createItem(dto);
  }
}
