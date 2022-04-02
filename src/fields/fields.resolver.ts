import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { Admin } from '../admins/models/admins.model'
import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { QianrensConnection } from '../qianrens/models/qianrens.model'
import { UpdateUserArgs } from '../users/models/users.model'
import { FieldsService } from './fields.service'
import { AddFieldArgs, IField, IFieldsConnection } from './models/fields.model'

@Resolver(of => IField)
export class FieldsResolver {
  constructor (private readonly fieldsService: FieldsService) {}

  @Query(of => IField, { description: '获取指定领域' })
  async field (@Args('id') id: string) {
    return await this.fieldsService.field(id)
  }

  @Query(of => IFieldsConnection, { description: '获取所有领域' })
  async fields (@Args() args: RelayPagingConfigArgs) {
    return await this.fieldsService.fields(args)
  }

  @Mutation(of => IField, { description: '新增领域' })
  async addField (@Args() args: AddFieldArgs) {
    return await this.fieldsService.addField(args)
  }

  @Mutation(of => IField, { description: '更新指定领域' })
  async updateField (@Args() args: UpdateUserArgs) {
    return await this.fieldsService.updateField(args)
  }

  @ResolveField(of => Admin, { description: '该领域的创建者' })
  async creator (@Parent() field: IField) {
    return await this.fieldsService.creator(field.id)
  }

  @ResolveField(of => QianrensConnection, { description: '该领域内的前人' })
  async qianrens (@Parent() field: IField, @Args() args: RelayPagingConfigArgs) {
    return await this.fieldsService.qianrens(field.id, args)
  }
}
