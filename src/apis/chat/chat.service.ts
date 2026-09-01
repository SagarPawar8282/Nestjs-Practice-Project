import { Inject, Injectable } from '@nestjs/common';
import { AuthenticatedSocket } from 'src/webSocket/interface/authenticated-socket.interface';
import { ChatMessageDto, SaveChatMessage, UpdateChatDto } from './dto/chat.dto';
import { CHAT_REPOSITORY } from './chat.repository';
import { Chat } from './chat.model';
import { ConnectionManagerService } from 'src/webSocket/connection-manager.service';
import { Customer } from '../customer/customer.model';
import { QueryService } from 'src/core/query/query.service';
import { Query } from 'src/common/services/query/query';

@Injectable()
export class ChatService {

  constructor(
    @Inject(CHAT_REPOSITORY) private readonly chatRepository: typeof Chat,
    private readonly connectionManager: ConnectionManagerService,
    private readonly queryService:QueryService
  ) { }

  async handleDisconnect(clientId: string) {

  }

  async sendMessage(senderId: number, payload: ChatMessageDto) {
    try {
      const chat = await this.create({ senderId: senderId, receiverId: payload?.receiverId, message: payload?.text, status: 'pending' });

      if (!chat) {
        throw Error('failed to send message!')
      }

      await this.update(chat?.id, { status: 'sent', sentAt: new Date() });

      if (senderId !== payload?.receiverId) {
        const receiverSockets = await this.connectionManager.getUserSockets(payload?.receiverId);
        
        if (receiverSockets.length > 0) {
          this.emitToSockets(receiverSockets,"chat:new",chat);
          await this.update(chat.id, {status: "delivered",deliveredAt: new Date()});
        }
      }

      const senderSockets = await this.connectionManager.getUserSockets(senderId);
      this.emitToSockets(senderSockets, 'chat:new', chat);

      await this.update(chat?.id, { status: 'delivered', deliveredAt: new Date() });

      const updatedChatObj = await this.chatRepository.findOne({where:{id:chat?.id}})
      return updatedChatObj;
    } catch (err) {
      throw Error(err.message);

    }
  }

  private emitToSockets(sockets: AuthenticatedSocket[], event: string, data: unknown) {
    for (const socket of sockets) {
      socket.emit(event, data);
    }
  }

  async create(createChat: SaveChatMessage) {
    const chat = await this.chatRepository.create(createChat);
    return chat;
  }

  async readMessage(receiverId: number, payload) {
    const message=await this.chatRepository.findOne({where:{id:payload?.messageId,receiverId:receiverId}});

    if(!message){
      throw new Error('message not found');
    }

    if(message.readAt){
      return ;
    }

    await this.chatRepository.update({ status: 'read', readAt: new Date() }, { where: { id: payload?.messageId, receiverId: receiverId, readAt:null} });

    const senderSocket= await this.connectionManager.getUserSockets(message?.senderId);
    this.emitToSockets(senderSocket,"chat:read",{ messageId:message.id,readAt:new Date()});

    const receiverSockets =await this.connectionManager.getUserSockets(message?.receiverId);
    this.emitToSockets(receiverSockets,"chat:message-read-sync",{messageId:message.id,readAt:new Date()})
  }

  async findRecentlyChatUser(receiverId:number){
    try{
      const user = await this.queryService.executeQuery(Query.returRecentlyChatUser(receiverId),null);
      return user;
    }catch(error){

    }
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const update = await this.chatRepository.update(updateChatDto, { where: { id } })
    return update;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
