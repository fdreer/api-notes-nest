import { JWT_SECRET } from './config/vars'
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces'

export const jwtOptions = {
  global: true,
  secret: JWT_SECRET,
  signOptions: { expiresIn: '1h' } as JwtSignOptions
}

export const BASE_URL = 'api/v1'
