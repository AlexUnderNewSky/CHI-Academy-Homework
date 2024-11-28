import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  namespace: "/notifications",
  cors: {
    origin: "*",
  },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log(`Websocket initialised`);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected`, client.id);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected`, client.id);
  }

  @SubscribeMessage("newPost")
  handleNewPost(@MessageBody() data: { message: string; user: string }) {
    console.log(data);
    this.server.emit("newPost", data);
  }
}
