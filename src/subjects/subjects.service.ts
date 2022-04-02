import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { AddSubjectArgs } from './models/subjects.model'

@Injectable()
export class SubjectsService {
  async removeSubject (id: string) {
    throw new Error('Method not implemented.')
  }

  async addSubject (args: AddSubjectArgs) {
    throw new Error('Method not implemented.')
  }

  async subjects (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async subject (id: string) {
    throw new Error('Method not implemented.')
  }
}
