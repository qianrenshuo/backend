import { Field, InterfaceType, ObjectType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'

@InterfaceType({ description: '人物的角色信息' })
export abstract class Role {
  @Field(of => String, { description: '创建时间' })
    createdAt: string
}

@ObjectType({
  description: '用户具有的角色信息',
  implements: () => [Role]
})
export class UserRole implements Role {
  @Field(of => String, { description: '角色id' })
    id: string

  @Field()
    createdAt: string
}

@ObjectType()
export class UserRolesConnection extends Connection<UserRole>(UserRole) {}
