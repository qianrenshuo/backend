import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { UpdateAdminArgs } from './models/admins.model'

@Injectable()
export class AdminsService {
  async subjects (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async carousels (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async updateAdmin (args: UpdateAdminArgs) {
    throw new Error('Method not implemented.')
  }

  async admins (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async admin (id: string) {
    throw new Error('Method not implemented.')
  }
}
