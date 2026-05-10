import { Test, TestingModule } from '@nestjs/testing';
import { RbacController } from './rbac.controller';
import { RbacService } from './rbac.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';

describe('RbacController', () => {
  let controller: RbacController;
  let service: RbacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RbacController],
      providers: [
        {
          provide: RbacService,
          useValue: {
            createRole: jest.fn().mockResolvedValue({ id: 'role1', name: 'HR' }),
            updateRole: jest.fn().mockResolvedValue({ id: 'role1', name: 'UpdatedHR' }),
            assignRole: jest.fn().mockResolvedValue({ id: 'map1', userId: 'user1', roleId: 'role1' }),
            createPermission: jest.fn().mockResolvedValue({ id: 'perm1', key: 'VIEW_PAYROLL' }),
            attachPermissionToRole: jest.fn().mockResolvedValue({ id: 'rp1', roleId: 'role1', permissionId: 'perm1' }),
            getUserRoles: jest.fn().mockResolvedValue([{ role: { id: 'role1', name: 'HR' } }]),
            getRolePermissions: jest.fn().mockResolvedValue([{ permission: { id: 'perm1', key: 'VIEW_PAYROLL' } }]),
          },
        },
      ],
    }).compile();

    controller = module.get<RbacController>(RbacController);
    service = module.get<RbacService>(RbacService);
  });

  it('should create a role', async () => {
    const dto: CreateRoleDto = { name: 'HR', companyId: 'comp1' };
    expect(await controller.createRole(dto)).toEqual({ id: 'role1', name: 'HR' });
    expect(service.createRole).toHaveBeenCalledWith(dto);
  });

  it('should update a role', async () => {
    const dto: UpdateRoleDto = { name: 'UpdatedHR' };
    expect(await controller.updateRole('role1', dto)).toEqual({ id: 'role1', name: 'UpdatedHR' });
    expect(service.updateRole).toHaveBeenCalledWith('role1', dto);
  });

  it('should assign a role to a user', async () => {
    const dto: AssignRoleDto = { userId: 'user1', roleId: 'role1' };
    expect(await controller.assignRole(dto)).toEqual({ id: 'map1', userId: 'user1', roleId: 'role1' });
    expect(service.assignRole).toHaveBeenCalledWith(dto);
  });

  it('should create a permission', async () => {
    const dto: CreatePermissionDto = { key: 'VIEW_PAYROLL' };
    expect(await controller.createPermission(dto)).toEqual({ id: 'perm1', key: 'VIEW_PAYROLL' });
    expect(service.createPermission).toHaveBeenCalledWith(dto);
  });

  it('should attach permission to role', async () => {
    expect(await controller.attachPermissionToRole('role1', 'perm1')).toEqual({
      id: 'rp1',
      roleId: 'role1',
      permissionId: 'perm1',
    });
    expect(service.attachPermissionToRole).toHaveBeenCalledWith('role1', 'perm1');
  });

  it('should get user roles', async () => {
    expect(await controller.getUserRoles('user1')).toEqual([{ role: { id: 'role1', name: 'HR' } }]);
    expect(service.getUserRoles).toHaveBeenCalledWith('user1');
  });

  it('should get role permissions', async () => {
    expect(await controller.getRolePermissions('role1')).toEqual([{ permission: { id: 'perm1', key: 'VIEW_PAYROLL' } }]);
    expect(service.getRolePermissions).toHaveBeenCalledWith('role1');
  });
});
