import { ArgsType, Field } from '@nestjs/graphql'

import { User } from '../../users/models/users.model'
import { Role } from '../auths.decorator'

export type UserWithRoles = User & {
  roles: Role[]
}

export interface Payload {
  id: string
  roles: Role[]
}

@ArgsType()
export class LoginArgs {
  @Field(of => String, { description: '只填code表示通过code进行登录', nullable: true })
    code?: string | null

  @Field(of => String, { description: '通过UserId进行登录' })
    userId?: string | null

  @Field(of => String, { description: '通过id进行登录', nullable: true })
    id?: string | null

  @Field(of => String, { description: '用户密码' })
    sign?: string | null
}

export type CheckUserResult = User & {success: boolean, roles: Role[]}
