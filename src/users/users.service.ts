import { ForbiddenException, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

import { UserIdExistException } from '../app.exception'
import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { DbService } from '../db/db.service'
import { code2Session, now } from '../tool'
import { LoginArgs, RegisterUserArgs, UpdateUserArgs, User, UserApplyQianrenArgs } from './models/users.model'

@Injectable()
export class UsersService {
  constructor (private readonly dbService: DbService) {}
  async transactions (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async consultations (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async roles (id: string, args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async applyQianren (args: UserApplyQianrenArgs) {
    throw new Error('Method not implemented.')
  }

  async login (args: LoginArgs) {
    throw new Error('Method not implemented.')
  }

  async updateUser (args: UpdateUserArgs) {
    throw new Error('Method not implemented.')
  }

  async registerUser (args: RegisterUserArgs): Promise<User> {
    const n = now()
    if (!args.code && !args.sign) {
      throw new ForbiddenException('code 和 sign 不能同时为null')
    }
    if (!args.userId) {
      args.userId = await this.getRandomUserId()
    }
    if (args.code) {
      const res = await code2Session(args.code)
      args.unionId = res.unionId
      args.openId = res.openId
    }
    delete args.code

    const query = `
      query v($userId: string) {
        v(func: eq(userId, $userId)) @filter(type(Admin) or type(User)) { v as uid }
      }
    `
    const condition = '@if( eq(len(v), 0) )'
    const mutation = {
      uid: '_:user',
      'dgraph.type': 'User',
      createdAt: n,
      updatedAt: n,
      lastLoginedAt: n,
      ...args
    }

    const res = await this.dbService.commitConditionalUperts<Map<string, string>, {
      v: Array<{uid: string}>
    }>({
      query,
      mutations: [{ mutation, condition }],
      vars: { $userId: args.userId }
    })

    if (res.json.v.length !== 0) {
      throw new UserIdExistException(args.userId)
    }

    return {
      id: res.uids.get('user'),
      ...args,
      createdAt: n,
      updatedAt: n,
      lastLoginedAt: n
    } as unknown as User
  }

  async getRandomUserId (): Promise<string> {
    while (1) {
      const userId = randomUUID()
      const query = `
        query v($userId: string) {
          v(func: eq(userId, $userId)) @filter(type(User) or type(Admin)) {
            count(uid)
          }
        }
      `
      const res = await this.dbService.commitQuery<{v: Array<{count: number}>}>({ query, vars: { $userId: userId } })

      if ((res.v[0]?.count ?? 0) === 0) {
        return userId
      }
    }
  }

  async users (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async user (id: string) {
    throw new Error('Method not implemented.')
  }
}
