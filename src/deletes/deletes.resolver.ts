import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { Admin } from '../admins/models/admins.model'
import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { DeletesService } from './deletes.service'
import { Delete, DeletesConnection, DeleteToUnion } from './models/deletes.model'

@Resolver(of => Delete)
export class DeletesResolver {
  constructor (private readonly deletesService: DeletesService) {}

  @Query(of => Delete, { description: '获取指定的删除' })
  async delete (@Args('id') id: string) {
    return await this.deletesService.delete(id)
  }

  @Query(of => DeletesConnection, { description: '获取全部删除' })
  async deletes (@Args() args: RelayPagingConfigArgs) {
    return await this.deletesService.deletes(args)
  }

  @ResolveField(of => Admin, { description: '删除的创建者' })
  async creator (@Parent() i: Delete) {
    return this.deletesService.creator(i.id)
  }

  @ResolveField(of => DeleteToUnion, { description: '被标记删除的对象' })
  async to (@Parent() i: Delete) {
    return this.deletesService.to(i.id)
  }
}
