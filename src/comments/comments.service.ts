import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'

@Injectable()
export class CommentsService {
  async to (id: any) {
    throw new Error('Method not implemented.')
  }

  async creator (id: any) {
    throw new Error('Method not implemented.')
  }

  async comments (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async comemnt (id: string) {
    throw new Error('Method not implemented.')
  }
}
