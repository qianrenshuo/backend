import { Injectable } from '@nestjs/common'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { LoginArgs, RegisterUserArgs, UpdateUserArgs, UserApplyQianrenArgs } from './models/users.model'

@Injectable()
export class UsersService {
  async consultations (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async roles (id: string, args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async applyQianren (args: UserApplyQianrenArgs) {
    throw new Error('Method not implemented.')
  }

  async login (args: LoginArgs) {
    throw new Error('Method not implemented.')
  }

  async updateUser (args: UpdateUserArgs) {
    throw new Error('Method not implemented.')
  }

  async registerUser (args: RegisterUserArgs) {
    throw new Error('Method not implemented.')
  }

  async users (args: RelayPagingConfigArgs) {
    throw new Error('Method not implemented.')
  }

  async user (id: string) {
    throw new Error('Method not implemented.')
  }
}
