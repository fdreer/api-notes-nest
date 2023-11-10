import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
import { NotesRepository } from './notes.repository'
import { UsersService } from '../users/users.service'
import { IdType } from '../types'
import { UpdateNoteDto } from './dto/update-note.dto'
import { UUID } from 'crypto'
import { plainToClass } from 'class-transformer'
import { ReadNoteDto } from './dto/read-note.dto'

@Injectable()
export class NotesService {
  constructor(
    private readonly noteRepository: NotesRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    await this.userService.checkIfExistById(createNoteDto.userId)

    return this.noteRepository
      .save(createNoteDto)
      .then(note => plainToClass(ReadNoteDto, note))
  }

  async findAll() {
    return this.noteRepository
      .findAll()
      .then(notes => notes.map(note => plainToClass(ReadNoteDto, note)))
  }

  async findById(id: IdType) {
    const note = await this.noteRepository.findById(id)

    if (!note) {
      throw new NotFoundException(`Note with id "${id}" not found`)
    }

    return plainToClass(ReadNoteDto, note)
  }

  async findNotesFromUser(id: IdType) {
    await this.userService.checkIfExistById(id)

    return this.noteRepository
      .findNotesFromUser(id)
      .then(notes => notes.map(note => plainToClass(ReadNoteDto, note)))
  }

  async update(id: UUID, updateNoteDto: UpdateNoteDto) {
    return this.noteRepository.update(id, updateNoteDto).then(updateResult => {
      if (updateResult.affected == 0) {
        throw new NotFoundException(`Note with id ${id} not found`)
      }
    })
  }

  async deleteById(id: IdType) {
    const deleteResult = await this.noteRepository.deleteById(id)

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Note with id "${id}" not found`)
    }
  }
}
