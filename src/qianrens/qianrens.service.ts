import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { UpdateQianrenArgs } from './models/qianrens.model'

@Injectable()
export class QianrensService {
  async updateQianren (args: UpdateQianrenArgs) {
    throw new Error('Method not implemented.')
  }

  async qianrens (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async qianren (id: string) {
    throw new Error('Method not implemented.')
  }
}