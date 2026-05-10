import { Controller, Post, Patch, Body, Param, Get } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('rbac')
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  @Post('roles')
  createRole(@Body() dto: CreateRoleDto) {
    return this.rbacService.createRole(dto);
  }

  @Patch('roles/:id')
  updateRole(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.rbacService.updateRole(id, dto);
  }

  @Post('assign')
  assignRole(@Body() dto: AssignRoleDto) {
    return this.rbacService.assignRole(dto);
  }

  @Post('permissions')
  createPermission(@Body() dto: CreatePermissionDto) {
    return this.rbacService.createPermission(dto);
  }

  @Post('roles/:roleId/permissions/:permissionId')
  attachPermissionToRole(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
  ) {
    return this.rbacService.attachPermissionToRole(roleId, permissionId);
  }

  @Get('users/:userId/roles')
  getUserRoles(@Param('userId') userId: string) {
    return this.rbacService.getUserRoles(userId);
  }

  @Get('roles/:roleId/permissions')
  getRolePermissions(@Param('roleId') roleId: string) {
    return this.rbacService.getRolePermissions(roleId);
  }
}
