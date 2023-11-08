import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Providers } from 'src/providers.enum'
import { Note } from './entities/note.entity'
import { Repository } from 'typeorm'
import { CreateNoteDto } from './dto/create-note.dto'
import { IdType } from 'src/types'
import { UUID } from 'crypto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class NotesRepository {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>
  ) {}

  async save(createNoteDto: CreateNoteDto): Promise<Note> {
    return await this.noteRepository.save(createNoteDto)
  }

  async findAll() {
    return await this.noteRepository.findBy({})
  }

  async findById(id: IdType) {
    const note = await this.noteRepository.findOneBy({ id })
    return note
  }

  async findNotesFromUser(userId: IdType) {
    const notes = await this.noteRepository.findBy({ userId })
    return notes
  }

  async update(id: UUID, newDataNote: UpdateNoteDto) {
    return this.noteRepository
      .update({ id }, newDataNote)
      .then(updateResult => {
        if (updateResult.affected == 0) {
          throw new NotFoundException(`Note with id ${id} not found`)
        }
      })
  }

  async deleteById(id: IdType) {
    return await this.noteRepository.delete(id)
  }
}
