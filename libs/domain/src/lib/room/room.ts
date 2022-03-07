import { Message } from "../message";
import { User } from "../user";

export class Room {
    readonly id: string | undefined;
    readonly participants: User[] = [];
    readonly messages: Message[] = [];
}
