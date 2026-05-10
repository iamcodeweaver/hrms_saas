import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { FileService } from './file.service';

describe('FileController', () => {
  let controller: FileController;
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        {
          provide: FileService,
          useValue: {
            createFile: jest.fn().mockResolvedValue({ id: 'f1' }),
            updateFile: jest.fn().mockResolvedValue({ id: 'f1', name: 'Updated' }),
            getFiles: jest.fn().mockResolvedValue([{ id: 'f1' }]),
            createEmployeeDocument: jest.fn().mockResolvedValue({ id: 'ed1' }),
            updateEmployeeDocument: jest.fn().mockResolvedValue({ id: 'ed1', description: 'Updated' }),
            getEmployeeDocuments: jest.fn().mockResolvedValue([{ id: 'ed1' }]),
          },
        },
      ],
    }).compile();

    controller = module.get<FileController>(FileController);
    service = module.get<FileService>(FileService);
  });

  it('should create a file', async () => {
    const dto = { companyId: 'c1', name: 'Contract', url: 'url' } as any;
    expect(await controller.createFile(dto)).toEqual({ id: 'f1' });
    expect(service.createFile).toHaveBeenCalledWith(dto);
  });

  it('should update a file', async () => {
    const dto = { name: 'Updated' } as any;
    expect(await controller.updateFile('f1', dto)).toEqual({ id: 'f1', name: 'Updated' });
    expect(service.updateFile).toHaveBeenCalledWith('f1', dto);
  });

  it('should get files by company', async () => {
    expect(await controller.getFiles('c1')).toEqual([{ id: 'f1' }]);
    expect(service.getFiles).toHaveBeenCalledWith('c1');
  });

  it('should create an employee document', async () => {
    const dto = { employeeId: 'e1', fileId: 'f1', description: 'Contract doc' } as any;
    expect(await controller.createEmployeeDocument(dto)).toEqual({ id: 'ed1' });
    expect(service.createEmployeeDocument).toHaveBeenCalledWith(dto);
  });

  it('should update an employee document', async () => {
    const dto = { description: 'Updated' } as any;
    expect(await controller.updateEmployeeDocument('ed1', dto)).toEqual({ id: 'ed1', description: 'Updated' });
    expect(service.updateEmployeeDocument).toHaveBeenCalledWith('ed1', dto);
  });

  it('should get employee documents', async () => {
    expect(await controller.getEmployeeDocuments('e1')).toEqual([{ id: 'ed1' }]);
    expect(service.getEmployeeDocuments).toHaveBeenCalledWith('e1');
  });
});
