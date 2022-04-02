import { ForbiddenException, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

import { UserIdExistException } from '../app.exception'
import { ORDER_BY, RelayPagingConfigArgs } from '../connections/models/connections.model'
import { DbService } from '../db/db.service'
import { code2Session, handleRelayPagingAfter, now, relayfyArrayForward, RelayfyArrayParam } from '../tool'
import { LoginArgs, RegisterUserArgs, UpdateUserArgs, User, UserApplyQianrenArgs, UsersConnection } from './models/users.model'

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

  async users ({ first, after, orderBy }: RelayPagingConfigArgs) {
    after = handleRelayPagingAfter(after)

    if (first && orderBy === ORDER_BY.CREATED_AT_DESC) {
      return await this.usersRelayForward(first, after)
    }
    throw new Error('Method not implemented.')
  }

  async usersRelayForward (first: number, after: string): Promise<UsersConnection> {
    const q1 = 'var(func: uid(users), orderdesc: createdAt) @filter(lt(createdAt, $after)) { q as uid }'
    const query = `
      query v($after: string) {
        var(func: type(User), orderdesc: createdAt) {
          users as uid
        }
        ${after ? q1 : ''}
        totalCount(func: uid(users)) { count(uid) }
        objs(func: uid(${after ? 'q' : 'users'}), orderdesc: createdAt, first: ${first}) {
          id: uid
          expand(_all_)
        }
        # 开始游标
        startO(func: uid(users), first: -1) {
          createdAt
        }
        # 结束游标
        endO(func: uid(users), first: 1) {
          createdAt
        }
      }
    `
    const res = await this.dbService.commitQuery<RelayfyArrayParam<User>>({ query, vars: { $after: after } })

    return relayfyArrayForward({
      ...res,
      first,
      after
    })
  }

  async user (id: string): Promise<User> {
    const query = `
      query v($id: string) {
        user(func: uid($id)) {
          id: uid
          expand(_all_)
        }
      }
    `
    const res = await this.dbService.commitQuery<{user: User[]}>({ query, vars: { $id: id } })
    return res.user[0]
  }
}
