import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentController } from './recruitment.controller';
import { RecruitmentService } from './recruitment.service';

describe('RecruitmentController', () => {
  let controller: RecruitmentController;
  let service: RecruitmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitmentController],
      providers: [
        {
          provide: RecruitmentService,
          useValue: {
            createApplicant: jest.fn().mockResolvedValue({ id: 'a1' }),
            getApplicants: jest.fn().mockResolvedValue([{ id: 'a1' }]),
            createJobPosition: jest.fn().mockResolvedValue({ id: 'j1' }),
            getJobPositions: jest.fn().mockResolvedValue([{ id: 'j1' }]),
            createJobApplication: jest.fn().mockResolvedValue({ id: 'app1' }),
            getApplications: jest.fn().mockResolvedValue([{ id: 'app1' }]),
            updateJobApplication: jest.fn().mockResolvedValue({ id: 'app1', status: 'SHORTLISTED' }),
            updateRecruitmentStage: jest.fn().mockResolvedValue({ id: 'stage1', name: 'Interview' }),
            getRecruitmentStages: jest.fn().mockResolvedValue([{ id: 'stage1' }]),
          },
        },
      ],
    }).compile();

    controller = module.get<RecruitmentController>(RecruitmentController);
    service = module.get<RecruitmentService>(RecruitmentService);
  });

  it('should create applicant', async () => {
    const dto = { companyId: 'c1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' } as any;
    expect(await controller.createApplicant(dto)).toEqual({ id: 'a1' });
    expect(service.createApplicant).toHaveBeenCalledWith(dto);
  });

  it('should get applicants', async () => {
    expect(await controller.getApplicants('c1')).toEqual([{ id: 'a1' }]);
    expect(service.getApplicants).toHaveBeenCalledWith('c1');
  });

  it('should create job position', async () => {
    const dto = { companyId: 'c1', title: 'Engineer', description: 'Build stuff' } as any;
    expect(await controller.createJobPosition(dto)).toEqual({ id: 'j1' });
    expect(service.createJobPosition).toHaveBeenCalledWith(dto);
  });

  it('should get job positions', async () => {
    expect(await controller.getJobPositions('c1')).toEqual([{ id: 'j1' }]);
    expect(service.getJobPositions).toHaveBeenCalledWith('c1');
  });

  it('should create job application', async () => {
    const dto = { companyId: 'c1', applicantId: 'a1', jobId: 'j1', status: 'APPLIED' } as any;
    expect(await controller.createJobApplication(dto)).toEqual({ id: 'app1' });
    expect(service.createJobApplication).toHaveBeenCalledWith(dto);
  });

  it('should get applications', async () => {
    expect(await controller.getApplications('j1')).toEqual([{ id: 'app1' }]);
    expect(service.getApplications).toHaveBeenCalledWith('j1');
  });

  it('should update job application', async () => {
    const dto = { status: 'SHORTLISTED' } as any;
    expect(await controller.updateJobApplication('app1', dto)).toEqual({ id: 'app1', status: 'SHORTLISTED' });
    expect(service.updateJobApplication).toHaveBeenCalledWith('app1', dto);
  });

  it('should update recruitment stage', async () => {
    const dto = { name: 'Interview' } as any;
    expect(await controller.updateRecruitmentStage('stage1', dto)).toEqual({ id: 'stage1', name: 'Interview' });
    expect(service.updateRecruitmentStage).toHaveBeenCalledWith('stage1', dto);
  });

  it('should get recruitment stages', async () => {
    expect(await controller.getRecruitmentStages('c1')).toEqual([{ id: 'stage1' }]);
    expect(service.getRecruitmentStages).toHaveBeenCalledWith('c1');
  });
});
