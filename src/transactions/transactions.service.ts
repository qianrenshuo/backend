import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'

@Injectable()
export class TransactionsService {
  async about (id: any) {
    throw new Error('Method not implemented.')
  }

  async to (id: string) {
    throw new Error('Method not implemented.')
  }

  async creator (id: string) {
    throw new Error('Method not implemented.')
  }

  async transaction (id: string) {
    throw new Error('Method not implemented.')
  }

  async transactions (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }
}
