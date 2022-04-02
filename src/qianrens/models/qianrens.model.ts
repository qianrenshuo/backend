import { ArgsType, Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'
import { Role, UserRole } from '../../users/models/user-roles.model'

export enum CONSULTATION_TYPE {
  GET_WX_NUMBER = 'GET_WX_NUMBER',
  VOICE = 'VOICE'
}

registerEnumType(CONSULTATION_TYPE, {
  name: 'CONSULTATION_TYPE'
})

@ObjectType({
  description: '前人角色',
  implements: () => [Role]
})
export class Qianren extends UserRole implements Role {
  @Field(of => String, { description: '前人id' })
    id: string

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

@ObjectType()
export class ConsultationType {
  @Field(of => CONSULTATION_TYPE, { description: '咨询类型' })
    type: CONSULTATION_TYPE

  @Field(of => Int, { description: '咨询费用，以人名币的分为单位' })
    consultationValue: number
}
