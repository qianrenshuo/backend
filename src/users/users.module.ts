import { Module } from '@nestjs/common'

import { UserApplyRolesInfosResolver } from './user-apply-roles-infos.resolver'
import { UserApplyRolesInfosService } from './user-apply-roles-infos.service'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  providers: [
    UsersResolver,
    UsersService,
    UserApplyRolesInfosResolver,
    UserApplyRolesInfosService
  ]
})
export class UsersModule {}
