import { Module } from '@nestjs/common'

import { UserApplyRolesInfosService } from './user-apply-roles-infos.service'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  providers: [UsersResolver, UsersService, UserApplyRolesInfosService]
})
export class UsersModule {}
