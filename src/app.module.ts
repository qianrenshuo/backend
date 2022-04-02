import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { join } from 'path'

import { AdminsModule } from './admins/admins.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CarouselsModule } from './carousels/carousels.module'
import { ConnectionsModule } from './connections/connections.module'
import { ConsultationsModule } from './consultations/consultations.module'
import { ConversationsModule } from './conversations/conversations.module'
import { CredentialsModule } from './credentials/credentials.module'
import { DbModule } from './db/db.module'
import { DeletesModule } from './deletes/deletes.module'
import { FieldsModule } from './fields/fields.module'
import { MessagesModule } from './messages/messages.module'
import { QianrensModule } from './qianrens/qianrens.module'
import { SubjectsModule } from './subjects/subjects.module'
import { TransactionsModule } from './transactions/transactions.module'
import { TransactionsResolver } from './transactions/transactions.resolver'
import { TransactionsService } from './transactions/transactions.service'
import { UsersModule } from './users/users.module'
import { CommentsModule } from './comments/comments.module';

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
    CarouselsModule,
    SubjectsModule,
    AdminsModule,
    CredentialsModule,
    FieldsModule,
    DeletesModule,
    ConsultationsModule,
    ConversationsModule,
    MessagesModule,
    TransactionsModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService, TransactionsResolver, TransactionsService]
})
export class AppModule {}
