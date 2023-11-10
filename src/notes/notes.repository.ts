import { Injectable } from '@nestjs/common'
import { Note } from './entities/note.entity'
import { Repository } from 'typeorm'
import { CreateNoteDto } from './dto/create-note.dto'
import { IdType } from '../types'
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
    return await this.noteRepository.findOneBy({ id })
  }

  async findNotesFromUser(userId: IdType) {
    const notes = await this.noteRepository.findBy({ userId })
    return notes
  }

  async update(id: UUID, newDataNote: UpdateNoteDto) {
    return this.noteRepository.update({ id }, newDataNote)
  }

  async deleteById(id: IdType) {
    // Este metodo no verifica si existe la nota, solo borra si existe
    return await this.noteRepository.delete(id)
  }
}
