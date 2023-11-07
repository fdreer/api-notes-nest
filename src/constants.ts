import { JWT_SECRET } from './config/vars'

export const jwtOptions = {
  global: true,
  secret: JWT_SECRET,
  signOptions: { expiresIn: '1h' }
}

export const BASE_URL = 'api/v1'
