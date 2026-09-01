import { Injectable } from '@nestjs/common';
import { ConnectionManagerService } from 'src/webSocket/connection-manager.service';


@Injectable()
export class PresenceService {
  constructor(private readonly connectionManagerService:ConnectionManagerService){}

  async userConnected(id: number) {
      const sockets=await this.connectionManagerService.getUserSockets(id);
      if(sockets.length === 1){
         this.broadcastOnline(id);
      }
  }

  async userDisconnected(id: number) {
    const sockets = await this.connectionManagerService.getUserSockets(id);
    if(sockets.length ===0){
      this.updateLastSeen();
      this.broadcastOffline();
    }
  }

  async broadcastOnline(id:number)   { }

  async broadcastOffline() { }

  async updateLastSeen() { }
}
