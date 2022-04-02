import { Module } from '@nestjs/common';
import { DeletesResolver } from './deletes.resolver';
import { DeletesService } from './deletes.service';

@Module({
  providers: [DeletesResolver, DeletesService]
})
export class DeletesModule {}
