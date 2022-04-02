import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { AddSubjectArgs, Subject, SubjectsConnection } from './models/subjects.model'
import { SubjectsService } from './subjects.service'

@Resolver()
export class SubjectsResolver {
  constructor (private readonly subjectsService: SubjectsService) {}

  @Query(of => Subject, { description: '获取指定专题' })
  async subject (@Args('id') id: string) {
    return await this.subjectsService.subject(id)
  }

  @Query(of => SubjectsConnection, { description: '获取所有专题' })
  async subjects (@Args() args: RelayPagingConfigArgs) {
    return await this.subjectsService.subjects(args)
  }

  @Mutation(of => Subject, { description: '添加专题' })
  async addSubject (@Args() args: AddSubjectArgs) {
    return await this.subjectsService.addSubject(args)
  }

  @Mutation(of => Subject, { description: '移除指定专题' })
  async removeSubject (@Args('id') id: string) {
    return await this.subjectsService.removeSubject(id)
  }
}
