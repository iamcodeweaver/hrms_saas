import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  create(@Body() dto: CreateLoanDto) {
    return this.loanService.create(dto);
  }

  @Get('company/:companyId')
  findAll(@Param('companyId') companyId: string) {
    return this.loanService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLoanDto) {
    return this.loanService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loanService.remove(id);
  }
}
