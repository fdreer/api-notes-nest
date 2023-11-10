import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
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
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`)
    }

    return plainToClass(ReadUserDto, user)
  }

  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username)
  }

  async findNotesFromUser(id: IdType) {
    return this.noteService.findNotesFromUser(id)
  }

  async checkIfExistByUsername(createUserDto: RegisterUserDto) {
    const exists = await this.userRepository.existsByUsername(createUserDto)

    if (exists) {
      throw new ConflictException(
        `El usuario con el nombre ${createUserDto.username} ya existe`
      )
    }
  }

  async checkIfExistById(id: IdType) {
    const exists = await this.userRepository.existsById(id)

    if (!exists) {
      throw new NotFoundException(`User with id "${id}" not found`)
    }
  }
}
