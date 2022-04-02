import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { Admin } from '../admins/models/admins.model'
import { RelayPagingConfigArgs } from '../connections/models/connections.model'
import { CredentialsService } from './credentials.service'
import { ICredential, ICredentialsConnection, ICredentialToUnion } from './models/credentials.model'

@Resolver(of => ICredential)
export class CredentialsResolver {
  constructor (private readonly credentialsService: CredentialsService) {}

  @Query(of => ICredential, { description: '获取指定认证凭证' })
  async credential (@Args('id') id: string) {
    return await this.credentialsService.credential(id)
  }

  @Query(of => ICredentialsConnection, { description: '获取所有认证凭证' })
  async credentials (@Args() args: RelayPagingConfigArgs) {
    return await this.credentialsService.credentials(args)
  }

  @ResolveField(of => Admin, { description: '凭证创建者' })
  async creator (@Parent() credential: ICredential) {
    return await this.credentialsService.creator(credential.id)
  }

  @ResolveField(of => ICredentialToUnion, { description: '该凭证授予的对象' })
  async to (@Parent() credential: ICredential) {
    return await this.credentialsService.to(credential.id)
  }
}
