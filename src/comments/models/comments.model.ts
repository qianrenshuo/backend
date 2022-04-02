import { createUnionType, Field, ObjectType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'
import { Consultation } from '../../consultations/models/consultations.model'
import { Qianren } from '../../qianrens/models/qianrens.model'
import { User } from '../../users/models/users.model'

@ObjectType()
export class Comment {
  @Field(of => String, { description: '评论id' })
    id: string

  @Field(of => String, { description: '评论创建时间' })
    createdAt: string

  @Field(of => String, { description: '评论的内容' })
    content: string
}

@ObjectType()
export class CommentsConnection extends Connection<Comment>(Comment) {}

export const CommentCreatorUnion = createUnionType({
  name: 'CommentCreatorUnion',
  types: () => [User, Qianren],
  resolveType (v: {'dgraph.type': string[]}) {
    if (v['dgraph.type']?.includes('User')) {
      return User
    }
    if (v['dgraph.type']?.includes('Qianren')) {
      return Qianren
    }
  }
})

export const CommentToUnion = createUnionType({
  name: 'CommentToUnion',
  types: () => [Consultation],
  resolveType (v: {'dgraph.type': string[]}) {
    if (v['dgraph.type']?.includes('Consultation')) {
      return Consultation
    }
  }
})
