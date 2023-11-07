import { forwardRef, Module } from '@nestjs/common'
import { NotesService } from './notes.service'
import { NotesController } from './notes.controller'
import { NotesRepository } from './notes.repository'
import { DatabaseModule } from 'src/database/database.module'
import { notesProviders } from './notes.providers'
import { UsersModule } from 'src/users/users.module'

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesRepository, ...notesProviders],
  imports: [DatabaseModule, forwardRef(() => UsersModule)],
  exports: [NotesService]
})
export class NotesModule {}
