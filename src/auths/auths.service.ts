import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { DbService } from '../db/db.service'
import { CheckUserResult, LoginArgs, Payload } from './models/auths.model'

@Injectable()
export class AuthsService {
  constructor (
    private readonly dbService: DbService,
    private readonly jwtService: JwtService
  ) {}

  async login ({ code, userId, sign, id }: LoginArgs) {
    if (userId && sign) {
      const user = await this.checkUserPasswordAndGetUser(userId, id, sign)
      const payload: Payload = { id: user.id, roles: user.roles }
      return {
        token: this.jwtService.sign(payload),
        ...user
      }
    }
    throw new Error('Method not implemented.')
  }

  async loginByUserIdAndSign (userId: string, sign: string) {
    throw new Error('Method not implemented.')
  }

  async checkUserPasswordAndGetUser (userId: string, id: string, sign: string) {
    if (userId && userId.length <= 2) {
      throw new ForbiddenException('userId 不能少于3个字符')
    }
    if (!userId && !id) {
      throw new ForbiddenException('userId 和 id 不能同时为空')
    }
    const query = userId
      ? `
      query v($sign: string, $userId: string, $id: string) {
        user(func: eq(userId, $userId)) @filter(type(User) OR type(Admin)) {
          id: t as uid
          expand(_all_)
          success: checkpwd(sign, $sign)
          roles: dgraph.type
        }
      }
      `
      : `
      query v($sign: string, $userId: string, $id: string) {
        user(func: uid($id)) @filter(type(User) or type(Admin)) {
          id: t as uid
          expand(_all_)
          success: checkpwd(sign, $sign)
          roles: dgraph.type
        }
      }
      `
    const now = new Date().toISOString()
    const condition = '@if( eq(len(t), 1) )'
    const mutation = {
      uid: 'uid(t)',
      lastLoginedAt: now
    }
    const res = await this.dbService.commitConditionalUperts<Map<string, string>, {user: CheckUserResult[]}>({
      query,
      vars: {
        $userId: userId,
        $sign: sign,
        $id: id
      },
      mutations: [{ mutation, condition }]
    })

    if (res.json.user.length !== 1 || !res.json.user[0].success) {
      throw new ForbiddenException('userId 或 id 或密码错误')
    }
    Object.assign(res.json.user[0], {
      lastLoginedAt: now
    })

    return res.json.user[0]
  }
}
