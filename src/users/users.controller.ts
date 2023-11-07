import {
  Controller,
  Body,
  Get,
  Param,
  HttpStatus,
  Patch,
  ParseUUIDPipe,
  HttpCode
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { IdType } from 'src/types'

@Controller('users')
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

  @Get(':id/notas')
  async getAllFromUser(@Param('id', ParseUUIDPipe) id: IdType) {
    return await this.userService.findNotesFromUser(id)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: IdType,
    @Body() newDataUser: UpdateUserDto
  ) {
    return await this.userService.update(id, newDataUser)
  }
}
