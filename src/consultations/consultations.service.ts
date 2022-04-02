import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'

@Injectable()
export class ConsultationsService {
  async consultationTypes (id: string) {
    throw new Error('Method not implemented.')
  }

  async consultation (id: string) {
    throw new Error('Method not implemented.')
  }

  async consultations (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }
}
