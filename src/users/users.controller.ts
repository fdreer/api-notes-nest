import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { IdType } from 'src/types'
import { BASE_URL } from '../constants'

@Controller(`${BASE_URL}/users`)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll() {
    return await this.userService.findAll()
  }

  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: IdType) {
    return await this.userService.findById(id)
  }

  @Get(':id/notes')
  async getAllNotesFromUser(@Param('id', ParseUUIDPipe) id: IdType) {
    return await this.userService.findNotesFromUser(id)
  }
}
