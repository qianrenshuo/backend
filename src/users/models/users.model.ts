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

  @Field({ description: '用户在小程序的openId', nullable: true })
    openId?: string | null

  @Field({ description: '用户在微信的unionId', nullable: true })
    unionId?: string | null

  @Field({ description: '用户的专业' })
    specialty: string

  @Field({ description: '手机号' })
    phoneNumber: string

  @Field({ description: '用户的年级' })
    grade: string
}

@ObjectType()
export class UsersConnection extends Connection<User>(User) {}

@ArgsType()
export class RegisterUserArgs {
  @Field({ description: '通过小程序的code注册', nullable: true })
    code?: string | null

  @Field({ description: '用户名，置空时系统自动生成', nullable: true })
    userId?: string | null

  @Field({ description: '密码，不能和code同时为空，否则无法登录；存在code时sign置空自动生成', nullable: true })
    sign?: string | null

  @Field({ description: '用户头像' })
    avatarImageUrl: string

  @Field({ description: '用户昵称' })
    name: string

  @Field({ description: '用户的专业' })
    specialty: string

  @Field({ description: '用户的手机号' })
    phoneNumber: string

  @Field({ description: '用户的年级' })
    grade: string

  openId?: string | null
  unionId?: string | null
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
