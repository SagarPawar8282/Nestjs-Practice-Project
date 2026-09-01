import { Module } from "@nestjs/common";
import { ConnectionManagerService } from "./connection-manager.service";
import { RoomManagerService } from "./room-manager.service";

@Module({
    providers:[ConnectionManagerService,RoomManagerService],
    exports:[ConnectionManagerService,RoomManagerService]
})export class WebSocketModule{}
