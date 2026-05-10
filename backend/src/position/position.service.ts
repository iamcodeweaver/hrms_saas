import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePositionDto) {
    return this.prisma.position.create({
      data: {
        title: dto.title,
        companyId: dto.companyId,
      },
    });
  }

  findAll() {
    return this.prisma.position.findMany({
      include: { company: true, employees: true },
    });
  }

  findOne(id: string) {
    return this.prisma.position.findUnique({
      where: { id },
      include: { company: true, employees: true },
    });
  }

  update(id: string, dto: UpdatePositionDto) {
    return this.prisma.position.update({
      where: { id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.position.delete({ where: { id } });
  }
}
