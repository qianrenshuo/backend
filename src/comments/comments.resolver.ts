import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { CommentsService } from './comments.service'
import { Comment, CommentCreatorUnion, CommentsConnection, CommentToUnion } from './models/comments.model'

@Resolver(of => Comment)
export class CommentsResolver {
  constructor (private readonly commentsService: CommentsService) {}

  @Query(of => Comment, { description: '获取指定的评论' })
  async comment (@Args('id')id: string) {
    return await this.commentsService.comemnt(id)
  }

  @Query(of => CommentsConnection, { description: '获取所有评论' })
  async comments (@Args()args: RelayPagingConfigArgs) {
    return await this.commentsService.comments(args)
  }

  @ResolveField(of => CommentCreatorUnion, { description: '评论创建者' })
  async creator (@Parent() comment: Comment) {
    return await this.commentsService.creator(comment.id)
  }

  @ResolveField(of => CommentToUnion, { description: '被评论对象' })
  async to (@Parent() comment: Comment) {
    return await this.commentsService.to(comment.id)
  }
}
