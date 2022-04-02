import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'

@Injectable()
export class DeletesService {
  creator(id: string) {
      throw new Error('Method not implemented.')
  }
  to(id: any) {
      throw new Error('Method not implemented.')
  }
  async delete (id: string) {
    throw new Error('Method not implemented.')
  }

  async deletes (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }
}
