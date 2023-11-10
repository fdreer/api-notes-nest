import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { IdType } from '../types'
import { BASE_URL } from '../constants'
import { Roles } from '../auth/constants.decorators'
import { Role } from './entities/role'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'
import { ReadUserDto } from './dto/read-user.dto'
import { ReadNoteDto } from '../notes/dto/read-note.dto'

@ApiTags('Users')
@ApiBearerAuth()
@Controller(`${BASE_URL}/users`)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOkResponse({ description: 'Users found', type: [ReadUserDto] })
  async getAll() {
    return await this.userService.findAll()
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({ description: 'User found', type: ReadUserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getOne(@Param('id', ParseUUIDPipe) id: IdType) {
    return await this.userService.findById(id)
  }

  @Get(':id/notes')
  @ApiOkResponse({ description: 'Notes found', type: [ReadNoteDto] })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getAllNotesFromUser(@Param('id', ParseUUIDPipe) id: IdType) {
    return await this.userService.findNotesFromUser(id)
  }
}
