import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { userProviders } from './users.providers'
import { UsersRepository } from './users.repository'
import { DatabaseModule } from 'src/database/database.module'
import { NotesModule } from 'src/notes/notes.module'

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule, forwardRef(() => NotesModule)],
  providers: [UsersService, UsersRepository, ...userProviders],
  exports: [UsersService, UsersRepository]
})
export class UsersModule {}
