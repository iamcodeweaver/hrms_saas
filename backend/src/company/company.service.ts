import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        timezone: dto.timezone ?? 'Africa/Lagos',
        currency: dto.currency ?? 'NGN',
        locale: dto.locale ?? 'en',
      },
    });
  }

  findAll() {
    return this.prisma.company.findMany({
      include: { branches: true, departments: true, positions: true },
    });
  }

  findOne(id: string) {
    return this.prisma.company.findUnique({
      where: { id },
      include: { branches: true, departments: true, positions: true },
    });
  }

  update(id: string, dto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }
}
