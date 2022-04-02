import { Module } from '@nestjs/common';
import { AuthsResolver } from './auths.resolver';
import { AuthsService } from './auths.service';

@Module({
  providers: [AuthsResolver, AuthsService]
})
export class AuthsModule {}
