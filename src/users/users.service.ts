import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { RegisterUserDto } from '../auth/dto/register-user.dto'
import { UsersRepository } from './users.repository'
import { IdType } from '../types'
import { NotesService } from '../notes/notes.service'
import { plainToClass } from 'class-transformer'
import { ReadUserDto } from './dto/read-user.dto'

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    @Inject(forwardRef(() => NotesService))
    private readonly noteService: NotesService
  ) {}

  async create(createUserDto: RegisterUserDto) {
    return this.userRepository.save(createUserDto)
  }

  async findAll() {
    return this.userRepository
      .findAll()
      .then(users => users.map(user => plainToClass(ReadUserDto, user)))
  }

  async findById(id: IdType) {
    return await this.userRepository
      .findById(id)
      .then(user => plainToClass(ReadUserDto, user))
  }

  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username)
  }

  async findNotesFromUser(id: IdType) {
    return this.noteService.findNotesFromUser(id)
  }

  async checkIfExist(createUserDto: RegisterUserDto) {
    return await this.userRepository.exists(createUserDto)
  }
}
