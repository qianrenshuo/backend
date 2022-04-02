import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { UserApplyRolesInfo, UserApplyRolesInfosConnection } from './models/user-apply-roles-infos.model'
import { UserRolesConnection } from './models/user-roles.model'
import { LoginArgs, RegisterUserArgs, UpdateUserArgs, User, UserApplyQianrenArgs, UsersConnection, UserWithLoginedToken } from './models/users.model'
import { UserApplyRolesInfosService } from './user-apply-roles-infos.service'
import { UsersService } from './users.service'

@Resolver(of => User)
export class UsersResolver {
  constructor (
    private readonly usersService: UsersService,
    private readonly userApplyRolesInfosService: UserApplyRolesInfosService
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
  async registerUser (@Args() args: RegisterUserArgs) {
    return await this.usersService.registerUser(args)
  }

  @Mutation(of => User, { description: '更新用户信息' })
  async updateUser (@Args() args: UpdateUserArgs) {
    return await this.usersService.updateUser(args)
  }

  @Mutation(of => UserWithLoginedToken, { description: '用户登录' })
  async login (@Args() args: LoginArgs) {
    return await this.usersService.login(args)
  }

  @Mutation(of => UserApplyRolesInfo, { description: '申请前人' })
  async applyQianren (@Args() args: UserApplyQianrenArgs) {
    return await this.usersService.applyQianren(args)
  }

  @Query(of => UserApplyRolesInfosConnection, { description: '所有用户的申请角色的信息' })
  async userApplyRolesInfos (@Args() args: RelayPagingConfigArgs) {
    return await this.userApplyRolesInfosService.getAll(args)
  }

  @ResolveField(of => UserRolesConnection, { description: '当前用户所具有的角色' })
  async roles (@Parent() user: User, @Args() args: RelayPagingConfigArgs) {
    return await this.usersService.roles(user.id, args)
  }
}
