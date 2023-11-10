import { INestApplication } from '@nestjs/common'

export const configSecurity = (app: INestApplication) => {
  app.enableCors({
    origin: '*'
  })
}
