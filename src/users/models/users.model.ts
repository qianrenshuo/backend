import { ArgsType, Field, ObjectType, PartialType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'

@ObjectType()
export class User {
  @Field({ description: '用户唯一id' })
    id: string

  @Field({ description: '用户头像' })
    avatarImageUrl: string

  @Field({ description: '唯一用户名' })
    userId: string

  @Field({ description: '用户昵称' })
    name: string

  @Field({ description: '用户注册时间' })
    createdAt: string

  @Field({ description: '用户更新时间' })
    updatedAt: string

  @Field({ description: '用户上一次登录时间' })
    lastLoginedAt: string

  @Field({ description: '用户在小程序的openId' })
    openId: string

  @Field({ description: '用户在微信的unionId' })
    unionId: string
}

@ObjectType()
export class UsersConnection extends Connection<User>(User) {}

@ArgsType()
export class RegisterUserArgs {
  @Field({ description: '通过小程序注册的code', nullable: true })
    code?: string | null
}

@ArgsType()
export class UpdateUserArgs {
  @Field({ description: '用户名', nullable: true })
    name?: string | null
}

@ArgsType()
export class LoginArgs {
  @Field(of => String, { description: '只填code表示通过code进行登录' })
    code?: string | null

  @Field(of => String, { description: '通过UserId进行登录' })
    userId?: string | null

  @Field(of => String, { description: '通过id进行登录' })
    id?: string | null

  @Field(of => String, { description: '用户密码' })
    sign?: string | null
}

@ObjectType()
export class UserWithLoginedToken extends PartialType(User) {
  @Field(of => String, { description: 'token' })
    token: string
}

@ArgsType()
export class UserApplyQianrenArgs {
  @Field(of => String, { description: '联系方式' })
    contact: string
}
