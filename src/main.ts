import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { PORT } from './config/vars'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  await app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
  })
}
bootstrap()
