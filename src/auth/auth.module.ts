import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from './auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { jwtOptions } from '../constants'

@Module({
  controllers: [AuthController],
  imports: [UsersModule, JwtModule.register(jwtOptions)],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AuthModule {}
