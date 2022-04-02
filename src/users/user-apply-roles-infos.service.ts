import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'

@Injectable()
export class UserApplyRolesInfosService {
  async addDeleteOnUserApplyRolesInfo (id: string) {
    throw new Error('Method not implemented.')
  }

  async userApplyRolesInfos (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async userApplyRolesInfo (id: string) {
    throw new Error('Method not implemented.')
  }

  async getAll (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }
}
