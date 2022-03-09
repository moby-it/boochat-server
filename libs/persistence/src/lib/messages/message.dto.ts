import { Room } from "@oursocial/domain";

export class CreateMessageDto {
    sender: string;
    receiver: string;
    content: string;
    timestamp: string;
    room: Room;
}