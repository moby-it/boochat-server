import { WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({
    namespace: 'chat',
    cors: {
        origin: '*'
    }
})
export class MessageGateway {

}