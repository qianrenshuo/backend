import { ArgsType, createUnionType, Field, ObjectType, registerEnumType } from '@nestjs/graphql'

import { Admin } from '../../admins/models/admins.model'
import { Connection } from '../../connections/models/connections.model'
import { Qianren } from '../../qianrens/models/qianrens.model'
import { User } from '../../users/models/users.model'

export enum MESSAGE_TYPE {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
}

registerEnumType(MESSAGE_TYPE, {
  name: 'MESSAGE_TYPE'
})

@ObjectType({ description: '消息对象' })
export class Message {
  @Field(of => String, { description: '消息id' })
    id: string

  @Field(of => MESSAGE_TYPE, { description: '消息的类型' })
    messageType: MESSAGE_TYPE

  @Field(of => String, { description: '消息的创建时间' })
    createdAt: string

  @Field(of => String, { description: '消息的内容' })
    content: string
}

@ObjectType()
export class MessagesConnection extends Connection<Message>(Message) {}

@ArgsType()
export class AddMessageToConversationArgs {
  @Field({ description: '会话id' })
    id: string
}

export const MessageCreatorUnion = createUnionType({
  name: 'MessageCreawtorUnion',
  types: () => [Admin, User, Qianren],
  resolveType (v: {'dgraph.type': string[]}) {
    if (v['dgraph.type']?.includes('Qianren')) {
      return Qianren
    }
    if (v['dgraph.type']?.includes('Admin')) {
      return Admin
    }
    if (v['dgraph.type']?.includes('User')) {
      return User
    }
  }
})
