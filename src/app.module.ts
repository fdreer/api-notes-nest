import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { NotesModule } from './notes/notes.module'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  NODE_ENV
} from './config/vars'
import { Note } from './notes/entities/note.entity'
import { User } from './users/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [Note, User],
      synchronize: NODE_ENV === 'development',
      dropSchema: NODE_ENV === 'development',
      logging: NODE_ENV === 'development',
      logger: 'advanced-console'
    }),
    UsersModule,
    NotesModule,
    AuthModule
  ]
})
export class AppModule {}

// exports --> se exporta un provider para que pueda ser utilizado en otro modulo
// import --> se importa los providers que son utilizados en un modulo
// providers --> se crean los providers que son utilizados en un modulo (son instanciados - inyteccion de dependencias)
