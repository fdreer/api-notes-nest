import { IdType } from '../../types'
import { Note } from '../../notes/entities/note.entity'
import { Role } from '../entities/role'
import { Exclude, Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

@Exclude()
export class ReadUserDto {
  @ApiProperty()
  @Expose()
  id: IdType

  @ApiProperty()
  @Expose()
  username: string

  @ApiProperty()
  @Expose()
  notes: Note[]

  @ApiProperty()
  @Expose()
  role: Role

  @ApiProperty()
  @Expose()
  createAt: Date

  @ApiProperty()
  @Expose()
  updateAt: Date
}
