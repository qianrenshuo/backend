import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'

export enum CONSULTATION_STATUE {
  WAIT_FOR_START = 'WAIT_FOR_START',
  RUNNING = 'RUNNING',
  DONE = 'DONE',
}

registerEnumType(CONSULTATION_STATUE, {
  name: 'CONSULTATION_STATUE'
})

@ObjectType({ description: '对前人发起的咨询' })
export class Consultation {
  @Field(of => String, { description: '咨询id' })
    id: string

  @Field(of => String, { description: '咨询的创建时间' })
    createdAt: string

  @Field(of => Int, { description: '咨询涉及的金额' })
    balance: number

  @Field(of => CONSULTATION_STATUE, { description: '咨询的状态' })
    status

  @Field(of => String, { description: '咨询的开始时间' })
    startTime: string

  @Field(of => String, { description: '咨询的结束时间' })
    endTime: string
}

@ObjectType()
export class ConsultationsConnection extends Connection<Consultation>(Consultation) {}
