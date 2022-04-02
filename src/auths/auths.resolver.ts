import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { UserWithLoginedToken } from '../users/models/users.model'
import { NoAuth } from './auths.decorator'
import { AuthsService } from './auths.service'
import { LoginArgs } from './models/auths.model'

@Resolver()
export class AuthsResolver {
  constructor (private readonly authsService: AuthsService) {}

  @Mutation(of => UserWithLoginedToken, { description: '用户登录' })
  @NoAuth()
  async login (@Args() args: LoginArgs) {
    return await this.authsService.login(args)
  }
}
