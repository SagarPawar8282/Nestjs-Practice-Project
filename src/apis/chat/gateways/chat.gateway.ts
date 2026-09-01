import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { ChatService } from "../chat.service";
import { Socket, Server } from "socket.io";
import { AuthService } from "src/core/auth/auth.service";
import { AuthenticatedSocket } from "src/webSocket/interface/authenticated-socket.interface";
import { ConnectionManagerService } from "src/webSocket/connection-manager.service";
import { ChatMessageDto, JoinChatDto } from "../dto/chat.dto";
import { RoomManagerService } from "src/webSocket/room-manager.service";
import { PresenceService } from "src/apis/presence/presence.service";

@WebSocketGateway({
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly chatService: ChatService,
        private readonly authservice: AuthService,
        private readonly connectionManagerService: ConnectionManagerService,
        private readonly roomManagerService:RoomManagerService,
        private readonly presenceService:PresenceService
    ) { }

    async handleConnection(client: AuthenticatedSocket,) {
        try {
            const token = client?.handshake?.auth?.token;
            const decodedUser = await this.authservice.validateToken(token);
            client.user = decodedUser;

            await this.connectionManagerService.addConnection(client);
            
            try{
            await this.presenceService.userConnected(client?.user?.id);
            }catch(err){
                console.log("error: "+err.message);
            }
            
        } catch (err) {
            console.log("error: " + err)
        }
    }

    @SubscribeMessage('chat:send')
    async handleChatMessage(@ConnectedSocket() client: AuthenticatedSocket,@MessageBody() payload: ChatMessageDto) {
        try {
            const chat = await this.chatService.sendMessage(client?.user?.id, payload);
            return {
                success: true,
                data: chat
            }
        } catch (err) {
            return{
                success: false,
                message: 'Failed to send message'
            }
        }
    }

    @SubscribeMessage('chat:join')
    async joinRoom(@ConnectedSocket() client:AuthenticatedSocket ,@MessageBody()payload:JoinChatDto){
        return await this.roomManagerService.joinPrivateRoom(client,client?.user?.id,payload?.receiverId)
    }

    @SubscribeMessage('chat:leave')
    async leaveRoom(@ConnectedSocket()client:AuthenticatedSocket,@MessageBody()payload:JoinChatDto){
        return this.roomManagerService.leavePrivateRoom(client,client?.user?.id,payload?.receiverId)
    }

    @SubscribeMessage('chat:typing')
    async handleTyping(@ConnectedSocket() client:AuthenticatedSocket,@MessageBody()payload:JoinChatDto){
        return this.roomManagerService.notifyTyping(client,client?.user?.id,payload?.receiverId);
    }

    @SubscribeMessage('chat:stop-typing')
    async handleStopTyping(@ConnectedSocket() client:AuthenticatedSocket,@MessageBody()payload:JoinChatDto){
        return this.roomManagerService.notifyStopTyping(client,client?.user?.id,payload?.receiverId)
    }

    @SubscribeMessage('chat:message-read')
    async handleMessageReadEvent(@ConnectedSocket()client:AuthenticatedSocket,@MessageBody()payload:any){
        const readMessage= await this.chatService.readMessage(client?.user?.id,payload);
    }

    async handleDisconnect(client: AuthenticatedSocket) {
        await this.connectionManagerService.removeConnection(client);
        await this.presenceService.userDisconnected(client?.user.id)
    }

}