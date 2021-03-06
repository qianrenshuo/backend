import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { NoAuth } from '../auths/auths.decorator'
import { CarouselsConnection } from '../carousels/models/carousels.model'
import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { SubjectsConnection } from '../subjects/models/subjects.model'
import { AdminsService } from './admins.service'
import { Admin, AdminsConnection, RegisterAdminArgs, UpdateAdminArgs } from './models/admins.model'

@Resolver(of => Admin)
export class AdminsResolver {
  constructor (private readonly adminsService: AdminsService) {}

  @Query(of => Admin, { description: '获取指定管理员' })
  async admin (@Args('id') id: string) {
    return await this.adminsService.admin(id)
  }

  @Query(of => AdminsConnection, { description: '获取所有管理员' })
  async admins (@Args() args: RelayPagingConfigArgs) {
    return await this.adminsService.admins(args)
  }

  @Mutation(of => Admin, { description: '更新管理员信息' })
  async updateAdmin (@Args() args: UpdateAdminArgs) {
    return await this.adminsService.updateAdmin(args)
  }

  @Mutation(of => Admin, { description: '注册管理员' })
  @NoAuth()
  async registerAdmin (@Args() args: RegisterAdminArgs) {
    return await this.adminsService.registerAdmin(args)
  }

  @ResolveField(of => CarouselsConnection, { description: '该管理员创建的所有轮播图' })
  async carousels (@Args() args: RelayPagingConfigArgs) {
    return await this.adminsService.carousels(args)
  }

  @ResolveField(of => SubjectsConnection, { description: '该管理员创建的所有专题' })
  async subjects (@Args() args: RelayPagingConfigArgs) {
    return await this.adminsService.subjects(args)
  }
}
