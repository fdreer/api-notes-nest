import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'
import { Public } from './constants.decorators'
import { BASE_URL } from '../constants'
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { AuthResponse } from './dto/auth-response.dto'

@ApiTags('Authentication')
@Controller(`${BASE_URL}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiCreatedResponse({ description: 'User created', type: AuthResponse })
  @ApiConflictResponse({ description: 'User already exists' })
  async create(@Body() createUserDto: RegisterUserDto) {
    return await this.authService.register(createUserDto)
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User logged in', type: AuthResponse })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() userData: LoginUserDto) {
    return await this.authService.login(userData)
  }
}
