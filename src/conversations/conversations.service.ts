import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'

@Injectable()
export class ConversationsService {
  async messages (id: string) {
    throw new Error('Method not implemented.')
  }

  async participants (id: string) {
    throw new Error('Method not implemented.')
  }

  async creator (id: string) {
    throw new Error('Method not implemented.')
  }

  async conversations (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async conversation (id: string) {
    throw new Error('Method not implemented.')
  }
}
