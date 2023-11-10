import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { jwtOptions } from '../../constants'
import { IS_PUBLIC_KEY } from '../constants.decorators'
import { Payload } from '../auth.types'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector // --> para recuperar metadatos de las rutas
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const request: Request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload: Payload = await this.jwtService.verifyAsync(token, {
        secret: jwtOptions.secret
      })

      request['payload'] = payload

      // TODO: averiguar que esto sea una buena practica:
      // en principio se hace esto para evitar que un usuario no pueda acceder a
      // informacion de otro usuario --> el userId de la request debe ser igual
      // al userId del payload
      const isSameId = request.headers['user_id'] === payload.sub

      if (!isSameId) {
        throw new UnauthorizedException()
      }
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
