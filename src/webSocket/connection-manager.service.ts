import { Injectable } from "@nestjs/common";
import { AuthenticatedSocket } from "./interface/authenticated-socket.interface";

@Injectable()
export class ConnectionManagerService {

    private readonly userSockets = new Map<number, Set<AuthenticatedSocket>>();

    
    addConnection(socket: AuthenticatedSocket) {
        const userId = socket?.user?.id;

        let socketSet = this.userSockets.get(userId);
        if (!socketSet) {
            socketSet = new Set<AuthenticatedSocket>();
            this.userSockets.set(userId, socketSet);
        }
        socketSet.add(socket);
        console.log("========== Connection Map ==========");
        for (const [userId, sockets] of this.userSockets) {
            console.log(
                `User ${userId} -> ${[...sockets].map(s => s.id).join(", ")}`
            );
        }

        console.log("====================================");
    }

    removeConnection(socket:AuthenticatedSocket){
        const userId=socket?.user?.id;
        let socketSet = this.userSockets.get(userId);

        if(!socketSet){
            return;
        }
        socketSet.delete(socket);
        if(socketSet.size===0){
            this.userSockets.delete(userId);
        }
        console.log("========== Connection Map ==========");
        for (const [userId, sockets] of this.userSockets) {
            console.log(
                `User ${userId} -> ${[...sockets].map(s => s.id).join(", ")}`
            );
        }

        console.log("====================================");
        return ;
    }

    async getUserSockets(userId:number){
        const socketSet = this.userSockets.get(userId);

        if(!socketSet){
            return [];
        }
        return [...socketSet];
    }

    isUserOnline(userId:number){

    }
}