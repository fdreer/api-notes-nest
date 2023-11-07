import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  Patch,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { NotesService } from './notes.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { IdType } from 'src/types'
import { UUID } from 'crypto'
import { UpdateNoteDto } from './dto/update-note.dto'

@Controller('notes')
@UseInterceptors(ClassSerializerInterceptor)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // TODO: debo eliminar el userId de la respuesta
  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.notesService.create(createNoteDto)
  }

  @Get()
  async getAll() {
    return await this.notesService.findAll()
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: IdType) {
    return await this.notesService.findById(id)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() fields: UpdateNoteDto
  ) {
    return await this.notesService.update(id, fields)
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseUUIDPipe) id: IdType) {
    return await this.notesService.deleteById(id)
  }
}
