import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { UpdateUserArgs } from '../users/models/users.model'
import { AddFieldArgs } from './models/fields.model'

@Injectable()
export class FieldsService {
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

  async addField (args: AddFieldArgs) {
    throw new Error('Method not implemented.')
  }

  async field (id: string) {
    throw new Error('Method not implemented.')
  }

  async fields (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }
}
