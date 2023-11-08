import { forwardRef, Module } from '@nestjs/common'
import { NotesService } from './notes.service'
import { NotesController } from './notes.controller'
import { NotesRepository } from './notes.repository'
import { UsersModule } from 'src/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Note } from './entities/note.entity'

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
  imports: [TypeOrmModule.forFeature([Note]), forwardRef(() => UsersModule)],
  exports: [NotesService]
})
export class NotesModule {}
