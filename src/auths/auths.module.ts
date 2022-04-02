import { Module } from '@nestjs/common'

import { DbService } from '../db/db.service'
import { SharedModule } from '../shared/shared.module'
import { AuthsResolver } from './auths.resolver'
import { AuthsService } from './auths.service'

@Module({
  imports: [SharedModule],
  providers: [AuthsResolver, AuthsService, DbService]
})
export class AuthsModule {}
