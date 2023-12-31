import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PORT } from './config/vars'
import { configOpenAPI } from './config/swagger-config'
import { globalConfig } from './config/global-config'
import { configSecurity } from './config/security-config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  configSecurity(app)
  globalConfig(app)
  configOpenAPI(app)

  await app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
  })
}
bootstrap()
