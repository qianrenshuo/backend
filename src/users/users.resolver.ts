import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { NoAuth } from '../auths/auths.decorator'
import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { ConsultationsConnection } from '../consultations/models/consultations.model'
import { TransactionsConnection } from '../transactions/models/transactions.model'
import { UserApplyRolesInfo } from './models/user-apply-roles-infos.model'
import { UserRolesConnection } from './models/user-roles.model'
import { RegisterUserArgs, UpdateUserArgs, User, UserApplyQianrenArgs, UsersConnection } from './models/users.model'
import { UsersService } from './users.service'

@Resolver(of => User)
export class UsersResolver {
  constructor (
    private readonly usersService: UsersService
  ) {}

  @Query(of => User, { description: '查询一个用户' })
  async user (@Args('id')id: string) {
    return await this.usersService.user(id)
  }

  @Query(of => UsersConnection, { description: '查询所有的用户' })
  async users (@Args() args: RelayPagingConfigArgs) {
    return await this.usersService.users(args)
  }

  @Mutation(of => User, { description: '用户注册' })
  @NoAuth()
  async registerUser (@Args() args: RegisterUserArgs) {
    return await this.usersService.registerUser(args)
  }

  @Mutation(of => User, { description: '更新用户信息' })
  async updateUser (@Args() args: UpdateUserArgs) {
    return await this.usersService.updateUser(args)
  }

  @Mutation(of => UserApplyRolesInfo, { description: '申请前人' })
  async applyQianren (@Args() args: UserApplyQianrenArgs) {
    return await this.usersService.applyQianren(args)
  }

  @ResolveField(of => UserRolesConnection, { description: '当前用户所具有的角色' })
  async roles (@Parent() user: User, @Args() args: RelayPagingConfigArgs) {
    return await this.usersService.roles(user.id, args)
  }

  @ResolveField(of => ConsultationsConnection, { description: '当前用户所有的咨询' })
  async consultations (@Args() args: RelayPagingConfigArgs) {
    return await this.usersService.consultations(args)
  }

  @ResolveField(of => TransactionsConnection, { description: '当前用户所有的转账' })
  async transactions (@Args() args: RelayPagingConfigArgs) {
    return await this.usersService.transactions(args)
  }
}
