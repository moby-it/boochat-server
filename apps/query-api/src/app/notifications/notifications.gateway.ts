import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'notifications' })
export class NotificationsGateway {}
