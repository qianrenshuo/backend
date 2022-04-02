import { Injectable } from '@nestjs/common'

import { UserIdExistException } from '../app.exception'
import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { DbService } from '../db/db.service'
import { now } from '../tool'
import { Admin, RegisterAdminArgs, UpdateAdminArgs } from './models/admins.model'

@Injectable()
export class AdminsService {
  constructor (private readonly dbService: DbService) {}

  async registerAdmin (args: RegisterAdminArgs): Promise<Admin> {
    const query = `
      query v($userId: string) {
        v(func: eq(userId, $userId)) { v as uid }
      }
    `
    const condition = '@if( eq(len(v), 0) )'
    const mutation = {
      uid: '_:admin',
      'dgraph.type': 'Admin',
      ...args,
      createdAt: now()
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
      id: res.uids.get('admin'),
      createdAt: now(),
      ...args
    }
  }

  async subjects (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async carousels (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async updateAdmin (args: UpdateAdminArgs) {
    throw new Error('Method not implemented.')
  }

  async admins (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async admin (id: string) {
    throw new Error('Method not implemented.')
  }
}
