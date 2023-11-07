import { Inject, Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { Repository } from 'typeorm'
import { Providers } from 'src/providers.enum'
import { UpdateUserDto } from './dto/update-user.dto'
import { IdType } from 'src/types'

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(Providers.USER_REPO)
    private userRepository: Repository<User>
  ) {}

  async save(createUserDto: CreateUserDto): Promise<User> {
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

  async exists(createUserDto: CreateUserDto) {
    return await this.userRepository.exist({
      where: {
        username: createUserDto.username
      }
    })
  }
}
