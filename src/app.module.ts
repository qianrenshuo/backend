import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { join } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConnectionsModule } from './connections/connections.module'
import { DbModule } from './db/db.module'
import { QianrensModule } from './qianrens/qianrens.module'
import { UsersModule } from './users/users.module'
import { CarouselsModule } from './carousels/carousels.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    DbModule,
    UsersModule,
    ConnectionsModule,
    QianrensModule,
    CarouselsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
