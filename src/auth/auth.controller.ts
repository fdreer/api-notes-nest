import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { LoginUserDto } from 'src/users/dto/login-user.dto'
import { Public } from './constants.decorators'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const authResponse = await this.authService.register(createUserDto)
    return res.status(HttpStatus.CREATED).json(authResponse)
  }

  @Public()
  @Post('login')
  async login(@Body() userData: LoginUserDto, @Res() res: Response) {
    const authResponse = await this.authService.login(userData)
    return res.status(HttpStatus.OK).json(authResponse)
  }
}
