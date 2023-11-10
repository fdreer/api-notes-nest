import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post
} from '@nestjs/common'
import { NotesService } from './notes.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { IdType } from '../types'
import { UUID } from 'crypto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { BASE_URL } from '../constants'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'
import { Roles } from '../auth/constants.decorators'
import { Role } from '../users/entities/role'
import { ReadNoteDto } from './dto/read-note.dto'

@ApiTags('Notes')
@ApiBearerAuth()
@Controller(`${BASE_URL}/notes`)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Note created', type: ReadNoteDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.notesService.create(createNoteDto)
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOkResponse({ description: 'Notes found', type: [ReadNoteDto] })
  async getAll() {
    return await this.notesService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Note found', type: ReadNoteDto })
  @ApiNotFoundResponse({ description: 'Note not found' })
  async getById(@Param('id', ParseUUIDPipe) id: IdType) {
    return await this.notesService.findById(id)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: 'Note updated' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() fields: UpdateNoteDto
  ) {
    return await this.notesService.update(id, fields)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Note deleted' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  async deleteById(@Param('id', ParseUUIDPipe) id: IdType) {
    return await this.notesService.deleteById(id)
  }
}
