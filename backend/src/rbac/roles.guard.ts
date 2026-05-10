import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RbacService } from './rbac.service';
import { ROLES_KEY } from './roles.decorator';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rbacService: RbacService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user; // populated by JWT strategy
    if (!user) return false;

    const roles = await this.rbacService.getUserRoles(user.sub);
    const roleNames = roles.map(r => r.role.name);

    if (requiredRoles && !requiredRoles.some(r => roleNames.includes(r))) {
      return false;
    }

    if (requiredPermissions) {
      const permissions = await Promise.all(
        roles.map(r => this.rbacService.getRolePermissions(r.role.id)),
      );
      const permissionKeys = permissions.flat().map(p => p.permission.key);

      if (!requiredPermissions.some(p => permissionKeys.includes(p))) {
        return false;
      }
    }

    return true;
  }
}
