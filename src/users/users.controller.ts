import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { IdType } from '../types'
import { BASE_URL } from '../constants'
import { Roles } from '../auth/constants.decorators'
import { Role } from './entities/role'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller(`${BASE_URL}/users`)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  async getAll() {
    return await this.userService.findAll()
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async getOne(@Param('id', ParseUUIDPipe) id: IdType) {
    return await this.userService.findById(id)
  }

  @Get(':id/notes')
  async getAllNotesFromUser(@Param('id', ParseUUIDPipe) id: IdType) {
    return await this.userService.findNotesFromUser(id)
  }
}
