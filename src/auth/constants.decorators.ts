import { SetMetadata } from '@nestjs/common'
import { Role } from '../users/entities/role'

export const IS_PUBLIC_KEY = 'isPublic'
export const ROLES_KEY = 'roles'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
