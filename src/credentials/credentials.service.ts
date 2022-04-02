import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'

@Injectable()
export class CredentialsService {
  async to (id: string) {
    throw new Error('Method not implemented.')
  }

  async creator (id: any) {
    throw new Error('Method not implemented.')
  }

  async credentials (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async credential (id: string) {
    throw new Error('Method not implemented.')
  }
}
