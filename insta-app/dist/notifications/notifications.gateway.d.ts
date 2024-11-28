import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
export declare class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: any): void;
    handleNewPost(data: {
        message: string;
        user: string;
    }): void;
}
