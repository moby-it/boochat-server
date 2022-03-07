import { WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({
    namespace: 'message',
    cors: {
        origin: '*'
    }
})
export class MessageGateway {

}