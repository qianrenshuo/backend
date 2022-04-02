import { Module } from '@nestjs/common';
import { QianrensService } from './qianrens.service';
import { QianrensResolver } from './qianrens.resolver';

@Module({
  providers: [QianrensService, QianrensResolver]
})
export class QianrensModule {}
