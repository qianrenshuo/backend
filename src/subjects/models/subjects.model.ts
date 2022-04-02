import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

import { Connection } from '../../connections/models/connections.model'

@ObjectType()
export class Subject {
  @Field(of => String, { description: '专题id' })
    id: string

  @Field(of => String, { description: '创建时间' })
    createdAt: string

  @Field(of => String, { description: '专题标题' })
    title: string

  @Field(of => String, { description: '专题相关的url' })
    url: string
}

@ObjectType()
export class SubjectsConnection extends Connection<Subject>(Subject) {}

@ArgsType()
export class AddSubjectArgs {
  @Field(of => String, { description: '专题标题' })
    title: string
}
