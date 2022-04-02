import { Module } from '@nestjs/common'

import { DbService } from '../db/db.service'
import { AdminsResolver } from './admins.resolver'
import { AdminsService } from './admins.service'

@Module({
  providers: [AdminsResolver, AdminsService, DbService]
})
export class AdminsModule {}
