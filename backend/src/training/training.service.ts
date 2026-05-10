import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTrainingProgramDto } from './dto/create-training-program.dto';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { CreateCertificationDto } from './dto/create-certification.dto';

@Injectable()
export class TrainingService {
  constructor(private prisma: PrismaService) {}

  createProgram(dto: CreateTrainingProgramDto) {
    return this.prisma.trainingProgram.create({
      data: {
        companyId: dto.companyId,
        title: dto.title,
        description: dto.description,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
      },
    });
  }

  getPrograms(companyId: string) {
    return this.prisma.trainingProgram.findMany({
      where: { companyId },
      include: { enrollments: true, certifications: true },
    });
  }

  enroll(dto: CreateEnrollmentDto) {
    return this.prisma.enrollment.create({
      data: {
        employeeId: dto.employeeId,
        programId: dto.programId,
      },
    });
  }

  getEnrollments(programId: string) {
    return this.prisma.enrollment.findMany({
      where: { programId },
      include: { employee: true },
    });
  }

  certify(dto: CreateCertificationDto) {
    return this.prisma.certification.create({
      data: {
        employeeId: dto.employeeId,
        programId: dto.programId,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      },
    });
  }

  getCertifications(employeeId: string) {
    return this.prisma.certification.findMany({
      where: { employeeId },
      include: { program: true },
    });
  }
}
