import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class RbacService {
  constructor(private prisma: PrismaService) {}

  createRole(dto: CreateRoleDto) {
    return this.prisma.role.create({
      data: {
        name: dto.name,
        companyId: dto.companyId,
      },
    });
  }

  updateRole(id: string, dto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: { ...dto },
    });
  }

  assignRole(dto: AssignRoleDto) {
    return this.prisma.userRoleMap.create({
      data: {
        userId: dto.userId,
        roleId: dto.roleId,
      },
    });
  }

  createPermission(dto: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: { key: dto.key },
    });
  }

  attachPermissionToRole(roleId: string, permissionId: string) {
    return this.prisma.rolePermission.create({
      data: {
        roleId,
        permissionId,
      },
    });
  }

  getUserRoles(userId: string) {
    return this.prisma.userRoleMap.findMany({
      where: { userId },
      include: { role: true },
    });
  }

  getRolePermissions(roleId: string) {
    return this.prisma.rolePermission.findMany({
      where: { roleId },
      include: { permission: true },
    });
  }
}
