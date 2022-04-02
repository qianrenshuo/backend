import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'

@Injectable()
export class UserApplyRolesInfosService {
  async getAll (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }
}
