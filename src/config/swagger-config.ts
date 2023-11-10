import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export const configOpenAPI = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API APP-NOTES')
    .setDescription('The app-notes API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}
