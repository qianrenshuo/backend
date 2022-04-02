import { Field, ObjectType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'

@ObjectType({ description: '用户申请角色的申请信息' })
export class UserApplyRolesInfo {
  @Field({ description: '申请的创建时间' })
    createdAt: string
}

@ObjectType()
export class UserApplyRolesInfosConnection extends Connection<UserApplyRolesInfo>(UserApplyRolesInfo) {}
