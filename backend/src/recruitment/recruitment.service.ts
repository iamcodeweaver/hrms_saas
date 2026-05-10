import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { UpdateRecruitmentStageDto } from './dto/update-recruitment-stage.dto';

@Injectable()
export class RecruitmentService {
  constructor(private prisma: PrismaService) {}

  createApplicant(dto: CreateApplicantDto) {
    return this.prisma.applicant.create({ data: { ...dto } });
  }

  getApplicants(companyId: string) {
    return this.prisma.applicant.findMany({ where: { companyId } });
  }

  createJobPosition(dto: CreateJobPositionDto) {
    return this.prisma.jobPosition.create({ data: { ...dto } });
  }

  getJobPositions(companyId: string) {
    return this.prisma.jobPosition.findMany({ where: { companyId } });
  }

  createJobApplication(dto: CreateJobApplicationDto) {
    return this.prisma.jobApplication.create({ data: { ...dto } });
  }

  getApplications(jobId: string) {
    return this.prisma.jobApplication.findMany({
      where: { jobId },
      include: { applicant: true, job: true },
    });
  }

  updateJobApplication(id: string, dto: UpdateJobApplicationDto) {
    return this.prisma.jobApplication.update({ where: { id }, data: { ...dto } });
  }

  updateRecruitmentStage(id: string, dto: UpdateRecruitmentStageDto) {
    return this.prisma.recruitmentStage.update({ where: { id }, data: { ...dto } });
  }

  getRecruitmentStages(companyId: string) {
    return this.prisma.recruitmentStage.findMany({ where: { companyId } });
  }
}
