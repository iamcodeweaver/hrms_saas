import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentService } from './recruitment.service';
import { PrismaService } from '../prisma.service';

describe('RecruitmentService', () => {
  let service: RecruitmentService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      applicant: { create: jest.fn(), findMany: jest.fn() },
      jobPosition: { create: jest.fn(), findMany: jest.fn() },
      jobApplication: { create: jest.fn(), findMany: jest.fn(), update: jest.fn() },
      recruitmentStage: { update: jest.fn(), findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecruitmentService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<RecruitmentService>(RecruitmentService);
  });

  it('should create applicant', async () => {
    await service.createApplicant({ companyId: 'c1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' } as any);
    expect(prisma.applicant.create).toHaveBeenCalled();
  });

  it('should get applicants', async () => {
    await service.getApplicants('c1');
    expect(prisma.applicant.findMany).toHaveBeenCalledWith({ where: { companyId: 'c1' } });
  });

  it('should create job position', async () => {
    await service.createJobPosition({ companyId: 'c1', title: 'Engineer', description: 'Build stuff' } as any);
    expect(prisma.jobPosition.create).toHaveBeenCalled();
  });

  it('should get job positions', async () => {
    await service.getJobPositions('c1');
    expect(prisma.jobPosition.findMany).toHaveBeenCalledWith({ where: { companyId: 'c1' } });
  });

  it('should create job application', async () => {
    await service.createJobApplication({ companyId: 'c1', applicantId: 'a1', jobId: 'j1', status: 'APPLIED' } as any);
    expect(prisma.jobApplication.create).toHaveBeenCalled();
  });

  it('should get applications', async () => {
    await service.getApplications('j1');
    expect(prisma.jobApplication.findMany).toHaveBeenCalledWith({
      where: { jobId: 'j1' },
      include: { applicant: true, job: true },
    });
  });

  it('should update job application', async () => {
    await service.updateJobApplication('app1', { status: 'SHORTLISTED' } as any);
    expect(prisma.jobApplication.update).toHaveBeenCalledWith({ where: { id: 'app1' }, data: { status: 'SHORTLISTED' } });
  });

  it('should update recruitment stage', async () => {
    await service.updateRecruitmentStage('stage1', { name: 'Interview' } as any);
    expect(prisma.recruitmentStage.update).toHaveBeenCalledWith({ where: { id: 'stage1' }, data: { name: 'Interview' } });
  });

  it('should get recruitment stages', async () => {
    await service.getRecruitmentStages('c1');
    expect(prisma.recruitmentStage.findMany).toHaveBeenCalledWith({ where: { companyId: 'c1' } });
  });
});
