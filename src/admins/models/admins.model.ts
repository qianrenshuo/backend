import { Field, ObjectType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'

@ObjectType()
export class Admin {
  @Field(of => String, { description: '管理员id' })
    id: string

  @Field({ description: '管理员注册时间' })
    createdAt: string

  @Field({ description: '管理员昵称' })
    name: string

  @Field({ description: '管理员用户名' })
    userId: string
}

@ObjectType()
export class AdminsConnection extends Connection<Admin>(Admin) {}

@ObjectType()
export class UpdateAdminArgs {
  @Field(of => String, { description: '管理员昵称', nullable: true })
    name?: string | null
}

@ObjectType()
export class RegisterAdminArgs {
  @Field(of => String, { description: '管理员昵称' })
    name?: string | null
}
