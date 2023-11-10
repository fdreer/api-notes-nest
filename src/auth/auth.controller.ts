import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'
import { Public } from './constants.decorators'
import { BASE_URL } from '../constants'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Authentication')
@Controller(`${BASE_URL}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async create(@Body() createUserDto: RegisterUserDto) {
    return await this.authService.register(createUserDto)
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userData: LoginUserDto) {
    return await this.authService.login(userData)
  }
}
