import { createUnionType, Field, Int, ObjectType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'
import { Consultation } from '../../consultations/models/consultations.model'

@ObjectType()
export class Transaction {
  @Field(of => String, { description: '交易id' })
    id: string

  @Field(of => Int, { description: '交易涉及的金额，以人名币的分为单位' })
    value: number

  @Field(of => String, { description: '交易创建的时间' })
    createdAt: string
}

@ObjectType()
export class TransactionsConnection extends Connection<Transaction>(Transaction) {}

export const TransactionAboutUnion = createUnionType({
  name: 'TransactionAboutUnion',
  types: () => [Consultation],
  resolveType (v: {'dgraph.type': string[]}) {
    if (v['dgraph.type']?.includes('Consultation')) {
      return Consultation
    }
  }
})
