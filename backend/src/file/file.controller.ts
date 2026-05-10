import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { CreateEmployeeDocumentDto } from './dto/create-employee-document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee-document.dto';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  createFile(@Body() dto: CreateFileDto) {
    return this.fileService.createFile(dto);
  }

  @Patch(':id')
  updateFile(@Param('id') id: string, @Body() dto: UpdateFileDto) {
    return this.fileService.updateFile(id, dto);
  }

  @Get('company/:companyId')
  getFiles(@Param('companyId') companyId: string) {
    return this.fileService.getFiles(companyId);
  }

  @Post('employee-documents')
  createEmployeeDocument(@Body() dto: CreateEmployeeDocumentDto) {
    return this.fileService.createEmployeeDocument(dto);
  }

  @Patch('employee-documents/:id')
  updateEmployeeDocument(@Param('id') id: string, @Body() dto: UpdateEmployeeDocumentDto) {
    return this.fileService.updateEmployeeDocument(id, dto);
  }

  @Get('employee-documents/:employeeId')
  getEmployeeDocuments(@Param('employeeId') employeeId: string) {
    return this.fileService.getEmployeeDocuments(employeeId);
  }
}
