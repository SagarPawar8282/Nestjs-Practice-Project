import { Module } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { WebSocketModule } from 'src/webSocket/webSocket.module';

@Module({
  imports:[WebSocketModule],
  controllers: [],
  providers: [PresenceService],
  exports:[PresenceService]
})
export class PresenceModule {}
