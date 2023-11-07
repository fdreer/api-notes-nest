import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
import { NotesRepository } from './notes.repository'
import { UsersService } from 'src/users/users.service'
import { IdType } from 'src/types'
import { UpdateNoteDto } from './dto/update-note.dto'
import { UUID } from 'crypto'

@Injectable()
export class NotesService {
  constructor(
    private readonly noteRepository: NotesRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const user = await this.userService.findById(createNoteDto.userId)

    if (!user) {
      throw new NotFoundException(
        `User with id "${createNoteDto.userId}" not found`
      )
    }

    // TODO: no funciona en este metodo el @Exclude() de class-transformer
    const newNote = await this.noteRepository.save(createNoteDto)
    return {
      ...newNote,
      userId: undefined
    }
  }

  async findAll() {
    return await this.noteRepository.findAll()
  }

  async findById(id: IdType) {
    const note = await this.noteRepository.findById(id)

    if (!note) {
      throw new NotFoundException(`Note with id "${id}" not found`)
    }

    return note
  }

  async findNotesFromUser(id: IdType) {
    const user = await this.userService.findById(id)

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return await this.noteRepository.findNotesFromUser(id)
  }

  async update(id: UUID, updateNoteDto: UpdateNoteDto) {
    return await this.noteRepository.update(id, updateNoteDto)
  }

  async deleteById(id: IdType) {
    return await this.noteRepository.deleteById(id)
  }
}
