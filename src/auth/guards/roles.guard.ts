import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '../../users/entities/role'
import { ROLES_KEY } from '../constants.decorators'
import { CustomRequest } from '../auth.types'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) {
      return true
    }

    const request: CustomRequest = context.switchToHttp().getRequest()
    const { payload } = request // --> seria la info del usuario seteada en auth.guard
    return this.matchRoles(requiredRoles, payload.role)
  }

  private matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole)
  }
}
