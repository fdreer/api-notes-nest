import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/entities/user.entity'
import { Payload } from './auth.types'
import { AuthResponse } from './dto/auth-response.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: RegisterUserDto) {
    await this.userService.checkIfExistByUsername(createUserDto)

    const userSaved = await this.userService.create({
      username: createUserDto.username,
      password: await bcrypt.hash(createUserDto.password, 10)
    })

    return this.buildResponse(userSaved)
  }

  async login(userData: LoginUserDto) {
    const user = await this.userService.findByUsername(userData.username)

    if (!user) {
      throw new UnauthorizedException('Datos de inicio de sesión incorrectos')
    }

    const { password: passwordDB } = user
    const isPasswordValid = await bcrypt.compare(userData.password, passwordDB)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Datos de inicio de sesión incorrectos')
    }

    return this.buildResponse(user)
  }

  private async buildResponse(user: User): Promise<AuthResponse> {
    return {
      jwt: await this.generateToken(this.buildPayload(user)),
      id: user.id
    }
  }

  private async generateToken(payload: Payload): Promise<string> {
    return await this.jwtService.signAsync(payload)
  }

  private buildPayload(user: User): Payload {
    return {
      sub: user.id,
      username: user.username,
      role: user.role
    }
  }
}
