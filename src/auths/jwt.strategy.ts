import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from '../users/users.service'
import { Payload } from './models/auths.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '123456'
    })
  }

  async validate (payload: Payload) {
    const userWithRoles = await this.usersService.getUserOrAdminWithRolesByUid(payload.id)
    if (!userWithRoles) {
      throw new UnauthorizedException(`用户 ${payload.id} 不存在`)
    }
    return userWithRoles
  }
}
