import { Test, TestingModule } from '@nestjs/testing';
import { RbacService } from './rbac.service';
import { PrismaService } from '../prisma.service';

describe('RbacService', () => {
  let service: RbacService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      role: { create: jest.fn(), update: jest.fn() },
      userRoleMap: { create: jest.fn(), findMany: jest.fn() },
      permission: { create: jest.fn() },
      rolePermission: { create: jest.fn(), findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RbacService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<RbacService>(RbacService);
  });

  it('should create a role', async () => {
    await service.createRole({ name: 'HR', companyId: 'comp1' });
    expect(prisma.role.create).toHaveBeenCalled();
  });

  it('should assign a role', async () => {
    await service.assignRole({ userId: 'user1', roleId: 'role1' });
    expect(prisma.userRoleMap.create).toHaveBeenCalled();
  });

  it('should create a permission', async () => {
    await service.createPermission({ key: 'VIEW_PAYROLL' });
    expect(prisma.permission.create).toHaveBeenCalled();
  });

  it('should attach permission to role', async () => {
    await service.attachPermissionToRole('role1', 'perm1');
    expect(prisma.rolePermission.create).toHaveBeenCalled();
  });

  it('should get user roles', async () => {
    await service.getUserRoles('user1');
    expect(prisma.userRoleMap.findMany).toHaveBeenCalled();
  });

  it('should get role permissions', async () => {
    await service.getRolePermissions('role1');
    expect(prisma.rolePermission.findMany).toHaveBeenCalled();
  });
});
