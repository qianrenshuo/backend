import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { Delete } from '../deletes/models/deletes.model'
import { UserApplyRolesInfo, UserApplyRolesInfosConnection } from './models/user-apply-roles-infos.model'
import { UserApplyRolesInfosService } from './user-apply-roles-infos.service'

@Resolver(of => UserApplyRolesInfo)
export class UserApplyRolesInfosResolver {
  constructor (private readonly userApplyRolesInfosService: UserApplyRolesInfosService) {}

  @Query(of => UserApplyRolesInfo, { description: '获取指定的用户角色申请信息' })
  async userApplyRolesInfo (@Args('id') id: string) {
    return await this.userApplyRolesInfosService.userApplyRolesInfo(id)
  }

  @Query(of => UserApplyRolesInfosConnection, { description: '获取所有的用户角色申请信息' })
  async userApplyRolesInfos (@Args() args: RelayPagingConfigArgs) {
    return await this.userApplyRolesInfosService.userApplyRolesInfos(args)
  }

  @Mutation(of => Delete, { description: '将一个申请标记为删除' })
  async addDeleteOnUserApplyRolesInfo (@Args('id') id: string) {
    return await this.userApplyRolesInfosService.addDeleteOnUserApplyRolesInfo(id)
  }
}
