import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { PrismaService } from '../prisma.service';

describe('FileService', () => {
  let service: FileService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      file: { create: jest.fn(), update: jest.fn(), findMany: jest.fn() },
      employeeDocument: { create: jest.fn(), update: jest.fn(), findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should create a file', async () => {
    await service.createFile({ companyId: 'c1', name: 'Contract', url: 'url' } as any);
    expect(prisma.file.create).toHaveBeenCalled();
  });

  it('should update a file', async () => {
    await service.updateFile('f1', { name: 'Updated' } as any);
    expect(prisma.file.update).toHaveBeenCalledWith({ where: { id: 'f1' }, data: { name: 'Updated' } });
  });

  it('should get files', async () => {
    await service.getFiles('c1');
    expect(prisma.file.findMany).toHaveBeenCalledWith({
      where: { companyId: 'c1' },
      include: { employee: true, employeeDocuments: true },
    });
  });

  it('should create employee document', async () => {
    await service.createEmployeeDocument({ employeeId: 'e1', fileId: 'f1' } as any);
    expect(prisma.employeeDocument.create).toHaveBeenCalled();
  });

  it('should update employee document', async () => {
    await service.updateEmployeeDocument('ed1', { description: 'Updated' } as any);
    expect(prisma.employeeDocument.update).toHaveBeenCalledWith({ where: { id: 'ed1' }, data: { description: 'Updated' } });
  });

  it('should get employee documents', async () => {
    await service.getEmployeeDocuments('e1');
    expect(prisma.employeeDocument.findMany).toHaveBeenCalledWith({
      where: { employeeId: 'e1' },
      include: { file: true },
    });
  });
});
