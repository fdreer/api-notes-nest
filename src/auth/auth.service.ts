import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { LoginUserDto } from 'src/users/dto/login-user.dto'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existUser = await this.userService.checkIfExist(createUserDto)

    if (existUser) {
      throw new BadRequestException(
        `El usuario con el nombre ${createUserDto.username} ya existe`
      )
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10)

    const newUser: CreateUserDto = {
      username: createUserDto.username,
      password: hashPassword
    }

    const userSaved = await this.userService.create(newUser)

    const payload = { sub: userSaved.id, username: userSaved.username }

    return {
      jwt: await this.jwtService.signAsync(payload),
      id: userSaved.id
    }
  }

  async login(userData: LoginUserDto) {
    const user = await this.userService.findByUsername(userData.username)

    if (!user) {
      throw new UnauthorizedException('Datos de inicio de sesión incorrectos')
    }

    const { password: passwordDB, username } = user

    const isPasswordValid = await bcrypt.compare(userData.password, passwordDB)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Datos de inicio de sesión incorrectos')
    }

    const payload = { sub: user.id, username }

    return {
      jwt: await this.jwtService.signAsync(payload),
      id: user.id
    }
  }
}
