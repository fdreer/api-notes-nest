import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { LoginUserDto } from 'src/users/dto/login-user.dto'
import { Public } from './constants.decorators'
import { BASE_URL } from '../constants'

@Controller(`${BASE_URL}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto)
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userData: LoginUserDto) {
    return await this.authService.login(userData)
  }
}
