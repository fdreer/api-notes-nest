import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { NotesModule } from './notes/notes.module'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [DatabaseModule, UsersModule, NotesModule, AuthModule]
})
export class AppModule {}

// exports --> se exporta un provider para que pueda ser utilizado en otro modulo
// import --> se importa los providers que son utilizados en un modulo
// providers --> se crean los providers que son utilizados en un modulo (son instanciados - inyteccion de dependencias)
