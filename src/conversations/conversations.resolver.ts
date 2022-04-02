import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { ConversationsService } from './conversations.service'
import { Conversation, ConversationCreatorUnion, ConversationParticipantUnion, ConversationsConnection } from './models/conversations.model'

@Resolver(of => Conversation)
export class ConversationsResolver {
  constructor (private readonly conversationsService: ConversationsService) {}

  @Query(of => Conversation, { description: '获取指定会话' })
  async conversation (@Args('id') id: string) {
    return await this.conversationsService.conversation(id)
  }

  @Query(of => ConversationsConnection, { description: '获取所有会话' })
  async conversations (@Args() args: RelayPagingConfigArgs) {
    return await this.conversationsService.conversations(args)
  }

  @ResolveField(of => ConversationCreatorUnion, { description: '会话创建者' })
  async creator (@Parent() conversation: Conversation) {
    return await this.conversationsService.creator(conversation.id)
  }

  @ResolveField(of => ConversationParticipantUnion, { description: '会话的参与者' })
  async participants (@Parent() conversation: Conversation) {
    return await this.conversationsService.participants(conversation.id)
  }
}
