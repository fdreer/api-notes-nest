import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length
} from 'class-validator'
import { IdType } from 'src/types'

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  title: string

  @IsString()
  @IsNotEmpty()
  @Length(3, 1000)
  content: string

  @IsBoolean()
  important: boolean

  @IsUUID()
  userId: IdType
}
