import { Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'
import { RegisterUserDto } from '../auth/dto/register-user.dto'
import { Repository } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { IdType } from '../types'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async save(createUserDto: RegisterUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto)
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findById(id: IdType) {
    return await this.userRepository.findOneBy({ id })
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOneBy({ username })
  }

  async update(id: IdType, newDataUser: UpdateUserDto) {
    return await this.userRepository.update(id, newDataUser)
  }

  async existsByUsername(createUserDto: RegisterUserDto) {
    return await this.userRepository.exist({
      where: {
        username: createUserDto.username
      }
    })
  }

  async existsById(id: IdType) {
    return await this.userRepository.exist({
      where: { id }
    })
  }
}
