import { Injectable } from '@nestjs/common'

import { AdminNotFoundException } from '../app.exception'
import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { DbService } from '../db/db.service'
import { now } from '../tool'
import { UpdateUserArgs } from '../users/models/users.model'
import { AddFieldArgs, IField } from './models/fields.model'

@Injectable()
export class FieldsService {
  constructor (private readonly dbService: DbService) {}

  async addDeleteOnField (id: string) {
    throw new Error('Method not implemented.')
  }

  async qianrens (id: string, args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async creator (id: string) {
    throw new Error('Method not implemented.')
  }

  async updateField (args: UpdateUserArgs) {
    throw new Error('Method not implemented.')
  }

  async addField (actorId: string, { title }: AddFieldArgs): Promise<IField> {
    const query = `
      query v($actorId: string) {
        v(func: uid($actorId)) @filter(type(Admin)) { v as uid }
      }
    `
    const condition = '@if( eq(len(v), 1) )'
    const mutation = {
      uid: '_:field',
      'dgraph.type': 'Field',
      title,
      createdAt: now(),
      creator: {
        uid: 'uid(v)'
      }
    }
    const res = await this.dbService.commitConditionalUperts<Map<string, string>, {
      v: Array<{uid: string}>
    }>({
      query,
      mutations: [{ mutation, condition }],
      vars: { $actorId: actorId }
    })

    if (res.json.v.length !== 1) {
      throw new AdminNotFoundException(actorId)
    }

    return {
      title,
      createdAt: now(),
      id: res.uids.get('field')
    }
  }

  async field (id: string) {
    throw new Error('Method not implemented.')
  }

  async fields (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }
}
