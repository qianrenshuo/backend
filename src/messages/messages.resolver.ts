import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { Conversation } from '../conversations/models/conversations.model'
import { MessagesService } from './messages.service'
import { AddMessageToConversationArgs, Message, MessageCreatorUnion, MessagesConnection } from './models/messages.model'

@Resolver()
export class MessagesResolver {
  constructor (private readonly messagesService: MessagesService) {}

  @Query(of => Message, { description: '获取指定的消息' })
  async message (@Args('id')id: string) {
    return await this.messagesService.message(id)
  }

  @Query(of => MessagesConnection, { description: '获取全部的消息' })
  async messages (@Args()args: RelayPagingConfigArgs) {
    return await this.messagesService.messages(args)
  }

  @Mutation(of => Message, { description: '添加消息到指定的会话' })
  async addMessageToConversation (@Args()args: AddMessageToConversationArgs) {
    return await this.messagesService.addMessageToConversation(args)
  }

  @ResolveField(of => Conversation, { description: '消息所在的会话' })
  async to (@Parent() message: Message) {
    return await this.messagesService.to(message.id)
  }

  @ResolveField(of => MessageCreatorUnion, { description: '消息创建者' })
  async creator (@Parent() message: Message) {
    return await this.messagesService.creator(message.id)
  }
}
