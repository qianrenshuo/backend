import { Module } from '@nestjs/common';
import { CredentialsResolver } from './credentials.resolver';
import { CredentialsService } from './credentials.service';

@Module({
  providers: [CredentialsResolver, CredentialsService]
})
export class CredentialsModule {}
