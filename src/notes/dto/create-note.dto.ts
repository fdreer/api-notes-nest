import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length
} from 'class-validator'
import { IdType } from '../../types'
import { Content, Title } from '../notes.config'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateNoteDto {
  @ApiProperty({ minLength: Title.MIN_LENGTH, maxLength: Title.MAX_LENGTH })
  @IsString()
  @IsNotEmpty()
  @Length(Title.MIN_LENGTH, Title.MAX_LENGTH)
  title: string

  @ApiProperty({ minLength: Content.MIN_LENGTH, maxLength: Content.MAX_LENGTH })
  @IsString()
  @IsNotEmpty()
  @Length(Content.MIN_LENGTH, Content.MAX_LENGTH)
  content: string

  @ApiProperty({ default: false })
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  important: boolean

  @IsUUID()
  @ApiProperty()
  userId: IdType
}
