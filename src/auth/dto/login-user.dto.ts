import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Password, Username } from '../../users/user.config'

export class LoginUserDto {
  @ApiProperty({
    minLength: Username.MIN_LENGTH,
    maxLength: Username.MAX_LENGTH
  })
  @IsString()
  username: string

  @ApiProperty({
    minLength: Password.MIN_LENGTH,
    maxLength: Password.MAX_LENGTH
  })
  @IsString()
  password: string
}
