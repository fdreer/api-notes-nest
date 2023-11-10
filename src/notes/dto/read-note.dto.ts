import { IdType } from '../../types'
import { Exclude, Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { Username } from '../../users/user.config'

@Exclude()
export class ReadNoteDto {
  @ApiProperty()
  @Expose()
  id: IdType

  @ApiProperty()
  @Expose()
  title: string

  @ApiProperty()
  @Expose()
  content: string

  @ApiProperty()
  @Expose()
  important: boolean

  @ApiProperty()
  @Expose()
  createAt: Date

  @ApiProperty()
  @Expose()
  updateAt: Date
}
