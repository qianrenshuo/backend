import { createUnionType, Field, ObjectType } from '@nestjs/graphql'

import { Admin } from '../../admins/models/admins.model'
import { Connection } from '../../connections/models/connections.model'
import { Qianren } from '../../qianrens/models/qianrens.model'
import { User } from '../../users/models/users.model'

@ObjectType()
export class Conversation {
  @Field(of => String, { description: '会话id' })
    id: string

  @Field(of => String, { description: '会话创建时间' })
    createdAt: string
}

@ObjectType()
export class ConversationsConnection extends Connection<Conversation>(Conversation) {}

export const ConversationCreatorUnion = createUnionType({
  name: 'ConversationCreatorUnion',
  types: () => [Admin, User, Qianren],
  resolveType (v: {'dgraph.type': string[]}) {
    if (v['dgraph.type']?.includes('Admin')) {
      return Admin
    }
    if (v['dgraph.type']?.includes('Qianren')) {
      return Qianren
    }
    if (v['dgraph.type']?.includes('User')) {
      return User
    }
  }
})

export const ConversationParticipantUnion = createUnionType({
  name: 'ConversationParticipantUnion',
  types: () => [Admin, User, Qianren],
  resolveType (v: {'dgraph.type': string []}) {
    if (v['dgraph.type']?.includes('Admin')) {
      return Admin
    }
    if (v['dgraph.type']?.includes('Qianren')) {
      return Qianren
    }
    if (v['dgraph.type']?.includes('User')) {
      return User
    }
  }
}
)
