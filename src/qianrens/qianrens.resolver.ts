import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { Qianren, QianrensConnection, UpdateQianrenArgs } from './models/qianrens.model'
import { QianrensService } from './qianrens.service'

@Resolver(of => Qianren)
export class QianrensResolver {
  constructor (private readonly qianrensService: QianrensService) {}

  @Query(of => Qianren, { description: '获取指定的前人' })
  async qianren (@Args('id') id: string) {
    return await this.qianrensService.qianren(id)
  }

  @Query(of => QianrensConnection, { description: '获取全部前人' })
  async qianrens (@Args() args: RelayPagingConfigArgs) {
    return await this.qianrensService.qianrens(args)
  }

  @Mutation(of => Qianren, { description: '更新前人信息' })
  async updateQianren (@Args() args: UpdateQianrenArgs) {
    return await this.qianrensService.updateQianren(args)
  }
}
