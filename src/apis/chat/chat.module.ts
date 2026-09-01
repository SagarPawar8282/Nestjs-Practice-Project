import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './gateways/chat.gateway';
import { AuthModule } from 'src/core/auth/auth.module';
import { WebSocketModule } from 'src/webSocket/webSocket.module';
import { ChatRepositoryProvider } from './chat.repository';
import { PresenceModule } from '../presence/presence.module';
import { QueryModule } from 'src/core/query/query.module';

@Module({
  imports:[AuthModule,WebSocketModule,PresenceModule,QueryModule],
  controllers: [ChatController],
  providers: [ChatService,ChatGateway,ChatRepositoryProvider],
})
export class ChatModule {}
