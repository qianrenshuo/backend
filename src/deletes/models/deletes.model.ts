import { createUnionType, Field, ObjectType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'
import { IField } from '../../fields/models/fields.model'

@ObjectType()
export class Delete {
  @Field({ description: '删除的id' })
    id: string

  @Field({ description: '删除的创建时间' })
    createdAt: string
}

@ObjectType()
export class DeletesConnection extends Connection<Delete>(Delete) {}

export const DeleteToUnion = createUnionType({
  name: 'DeleteToUnion',
  types: () => [IField],
  resolveType (v: {'dgraph.type': string[]}) {
    if (v['dgraph.type']?.includes('Field')) {
      return IField
    }
  }
})
