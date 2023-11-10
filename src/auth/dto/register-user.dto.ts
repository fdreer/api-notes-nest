import { IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Password, Username } from '../../users/user.config'

export class RegisterUserDto {
  @ApiProperty({
    minLength: Username.MIN_LENGTH,
    maxLength: Username.MAX_LENGTH
  })
  @IsString()
  @Length(Username.MIN_LENGTH, Username.MAX_LENGTH)
  username: string

  @ApiProperty({
    minLength: Password.MIN_LENGTH,
    maxLength: Password.MAX_LENGTH
  })
  @IsString()
  @Length(Password.MIN_LENGTH, Password.MAX_LENGTH)
  password: string
}
