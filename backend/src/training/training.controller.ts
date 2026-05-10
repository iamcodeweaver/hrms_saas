import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingProgramDto } from './dto/create-training-program.dto';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { CreateCertificationDto } from './dto/create-certification.dto';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post('program')
  createProgram(@Body() dto: CreateTrainingProgramDto) {
    return this.trainingService.createProgram(dto);
  }

  @Get('programs/:companyId')
  getPrograms(@Param('companyId') companyId: string) {
    return this.trainingService.getPrograms(companyId);
  }

  @Post('enroll')
  enroll(@Body() dto: CreateEnrollmentDto) {
    return this.trainingService.enroll(dto);
  }

  @Get('enrollments/:programId')
  getEnrollments(@Param('programId') programId: string) {
    return this.trainingService.getEnrollments(programId);
  }

  @Post('certify')
  certify(@Body() dto: CreateCertificationDto) {
    return this.trainingService.certify(dto);
  }

  @Get('certifications/:employeeId')
  getCertifications(@Param('employeeId') employeeId: string) {
    return this.trainingService.getCertifications(employeeId);
  }
}
