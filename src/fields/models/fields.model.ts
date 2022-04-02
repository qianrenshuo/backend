import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'

@ObjectType({ description: '前人擅长的领域' })
export class IField {
  @Field(of => String, { description: '领域id' })
    id: string

  @Field(of => String, { description: '领域创建时间' })
    createdAt: string

  @Field(of => String, { description: '领域的标题' })
    title: string
}

@ObjectType()
export class IFieldsConnection extends Connection<IField>(IField) {}

@ArgsType()
export class UpdateFieldArgs {
  @Field(of => String, { description: '领域的名字' })
    title: string
}

@ArgsType()
export class AddFieldArgs {
  @Field(of => String, { description: '领域的名字' })
    title: string
}
