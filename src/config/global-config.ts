import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export const globalConfig = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
}
