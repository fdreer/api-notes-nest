import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from './guards/auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { jwtOptions } from '../constants'
import { RolesGuard } from './guards/roles.guard'

@Module({
  controllers: [AuthController],
  imports: [UsersModule, JwtModule.register(jwtOptions)],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AuthModule {}
