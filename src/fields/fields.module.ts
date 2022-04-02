import { Module } from '@nestjs/common';
import { FieldsResolver } from './fields.resolver';
import { FieldsService } from './fields.service';

@Module({
  providers: [FieldsResolver, FieldsService]
})
export class FieldsModule {}
