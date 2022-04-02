import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { AddMessageToConversationArgs } from './models/messages.model'

@Injectable()
export class MessagesService {
  async creator (id: string) {
    throw new Error('Method not implemented.')
  }

  async to (id: string) {
    throw new Error('Method not implemented.')
  }

  async addMessageToConversation (args: AddMessageToConversationArgs) {
    throw new Error('Method not implemented.')
  }

  async messages (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async message (id: string) {
    throw new Error('Method not implemented.')
  }
}
