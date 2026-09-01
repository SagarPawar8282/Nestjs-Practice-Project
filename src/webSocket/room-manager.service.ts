import { Injectable } from "@nestjs/common";
import { AuthenticatedSocket } from "./interface/authenticated-socket.interface";

@Injectable()
export class RoomManagerService {
    private getPrivateRoomName(userId1: number, userId2: number) {
        const smaller = Math.min(userId1, userId2);
        const larger = Math.max(userId1, userId2);
        return `chat-${smaller}-${larger}`;
    }

    async joinPrivateRoom(client:AuthenticatedSocket,senderId:number,receiverId:number){
        const room = this.getPrivateRoomName(senderId,receiverId);
        client.join(room);
        return {
            success:true,
            room
        }
    }

    async leavePrivateRoom(client:AuthenticatedSocket,senderId:number,receiverId:number){
        const room = this.getPrivateRoomName(senderId,receiverId);
        client.leave(room);
        return{
            success:true,
            room
        }
    }

    async notifyTyping(client:AuthenticatedSocket,senderId:number,receiverId:number){
        const room = this.getPrivateRoomName(senderId,receiverId);
        client.to(room).emit('chat:typing')
        return {
            success:true
        }
    }

    async notifyStopTyping(client:AuthenticatedSocket,senderId:number,receiverId:number){
        const room=this.getPrivateRoomName(senderId,receiverId);
        client.to(room).emit('chat:stop-typing')
        return {
            success:true
        }
    }
}