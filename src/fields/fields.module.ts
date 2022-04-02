import { Module } from '@nestjs/common'

import { DbService } from '../db/db.service'
import { FieldsResolver } from './fields.resolver'
import { FieldsService } from './fields.service'

@Module({
  providers: [FieldsResolver, FieldsService, DbService]
})
export class FieldsModule {}
