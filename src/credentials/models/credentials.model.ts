import { createUnionType, Field, ObjectType } from '@nestjs/graphql'

import { Admin } from '../../admins/models/admins.model'
import { Connection } from '../../connections/models/connections.model'
import { Qianren } from '../../qianrens/models/qianrens.model'

@ObjectType({ description: '认证凭证' })
export class ICredential {
  @Field(of => String, { description: '凭证id' })
    id: string

  @Field(of => String, { description: '颁发时间' })
    createdAt: string
}

@ObjectType()
export class ICredentialsConnection extends Connection<ICredential>(ICredential) {}

export const ICredentialToUnion = createUnionType({
  name: 'ICredentialToUnion',
  types: () => [Admin, Qianren],
  resolveType (v: {'dgraph.type': string[]}) {
    if (v['dgraph.type']?.includes('Admin')) {
      return Admin
    }
    if (v['dgraph.type']?.includes('Qianren')) {
      return Qianren
    }
  }
})
