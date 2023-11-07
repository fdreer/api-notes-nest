import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersRepository } from './users.repository'
import { UpdateUserDto } from './dto/update-user.dto'
import { IdType } from 'src/types'
import { NotesService } from '../notes/notes.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    @Inject(forwardRef(() => NotesService))
    private readonly noteService: NotesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto)
  }

  async findAll() {
    return await this.userRepository.findAll()
  }

  async findById(id: IdType) {
    return await this.userRepository.findById(id)
  }

  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username)
  }

  async findNotesFromUser(id: IdType) {
    return this.noteService.findNotesFromUser(id)
  }

  async update(id: IdType, newDataUser: UpdateUserDto) {
    return await this.userRepository.update(id, newDataUser)
  }

  async checkIfExist(createUserDto: CreateUserDto) {
    return await this.userRepository.exists(createUserDto)
  }
}
