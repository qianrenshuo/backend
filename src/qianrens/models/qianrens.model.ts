import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'
import { Role } from '../../users/models/user-roles.model'

@ObjectType({
  description: '前人角色',
  implements: () => [Role]
})
export class Qianren implements Role {
  @Field(of => String, { description: '创建时间' })
    createdAt: string
}

@ObjectType()
export class QianrensConnection extends Connection<Qianren>(Qianren) {}

@ArgsType()
export class UpdateQianrenArgs {
  @Field(of => String, { description: '前人的名字' })
    name: string
}
