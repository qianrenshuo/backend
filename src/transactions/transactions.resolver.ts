import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { User } from '../users/models/users.model'
import { Transaction, TransactionAboutUnion, TransactionsConnection } from './models/transactions.model'
import { TransactionsService } from './transactions.service'

@Resolver(of => Transaction)
export class TransactionsResolver {
  constructor (private readonly transactionsService: TransactionsService) {}

  @Query(of => Transaction, { description: '获取指定的交易' })
  async transaction (@Args('id') id: string) {
    return await this.transactionsService.transaction(id)
  }

  @Query(of => TransactionsConnection, { description: '获取所有的交易' })
  async transactions (@Args() args: RelayPagingConfigArgs) {
    return await this.transactionsService.transactions(args)
  }

  @ResolveField(of => User, { description: '交易的创建者' })
  async creator (@Parent() transaction: Transaction) {
    return await this.transactionsService.creator(transaction.id)
  }

  @ResolveField(of => User, { description: '被转账的对象' })
  async to (@Parent() transaction: Transaction) {
    return await this.transactionsService.to(transaction.id)
  }

  @ResolveField(of => TransactionAboutUnion, { description: '转账涉及的对象' })
  async about (@Parent() transaction: Transaction) {
    return await this.transactionsService.about(transaction.id)
  }
}
