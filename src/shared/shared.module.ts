import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { DbService } from 'src/db/db.service'

import { JwtStrategy } from '../auths/jwt.strategy'
import { UsersService } from '../users/users.service'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: '123456',
          signOptions: {
            expiresIn: '1d'
          }
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [
    JwtStrategy,
    DbService,
    UsersService
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    JwtModule
  ]
})
export class SharedModule {}
