import { Module } from '@nestjs/common';
import { SearchsResolver } from './searchs.resolver';
import { SearchsService } from './searchs.service';

@Module({
  providers: [SearchsResolver, SearchsService]
})
export class SearchsModule {}
