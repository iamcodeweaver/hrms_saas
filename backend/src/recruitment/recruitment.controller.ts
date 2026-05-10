import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { UpdateRecruitmentStageDto } from './dto/update-recruitment-stage.dto';

@Controller('recruitment')
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @Post('applicant')
  createApplicant(@Body() dto: CreateApplicantDto) {
    return this.recruitmentService.createApplicant(dto);
  }

  @Get('applicants/:companyId')
  getApplicants(@Param('companyId') companyId: string) {
    return this.recruitmentService.getApplicants(companyId);
  }

  @Post('job-position')
  createJobPosition(@Body() dto: CreateJobPositionDto) {
    return this.recruitmentService.createJobPosition(dto);
  }

  @Get('job-positions/:companyId')
  getJobPositions(@Param('companyId') companyId: string) {
    return this.recruitmentService.getJobPositions(companyId);
  }

  @Post('job-application')
  createJobApplication(@Body() dto: CreateJobApplicationDto) {
    return this.recruitmentService.createJobApplication(dto);
  }

  @Get('applications/:jobId')
  getApplications(@Param('jobId') jobId: string) {
    return this.recruitmentService.getApplications(jobId);
  }

  @Patch('job-application/:id')
  updateJobApplication(@Param('id') id: string, @Body() dto: UpdateJobApplicationDto) {
    return this.recruitmentService.updateJobApplication(id, dto);
  }

  @Patch('recruitment-stage/:id')
  updateRecruitmentStage(@Param('id') id: string, @Body() dto: UpdateRecruitmentStageDto) {
    return this.recruitmentService.updateRecruitmentStage(id, dto);
  }

  @Get('stages/:companyId')
  getRecruitmentStages(@Param('companyId') companyId: string) {
    return this.recruitmentService.getRecruitmentStages(companyId);
  }
}
