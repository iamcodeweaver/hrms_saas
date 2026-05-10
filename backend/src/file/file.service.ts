import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { CreateEmployeeDocumentDto } from './dto/create-employee-document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee-document.dto';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  createFile(dto: CreateFileDto) {
    return this.prisma.file.create({ data: { ...dto } });
  }

  updateFile(id: string, dto: UpdateFileDto) {
    return this.prisma.file.update({ where: { id }, data: { ...dto } });
  }

  getFiles(companyId: string) {
    return this.prisma.file.findMany({
      where: { companyId },
      include: { employee: true, employeeDocuments: true },
    });
  }

  createEmployeeDocument(dto: CreateEmployeeDocumentDto) {
    return this.prisma.employeeDocument.create({ data: { ...dto } });
  }

  updateEmployeeDocument(id: string, dto: UpdateEmployeeDocumentDto) {
    return this.prisma.employeeDocument.update({ where: { id }, data: { ...dto } });
  }

  getEmployeeDocuments(employeeId: string) {
    return this.prisma.employeeDocument.findMany({
      where: { employeeId },
      include: { file: true },
    });
  }
}
