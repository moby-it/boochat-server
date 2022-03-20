import { Injectable } from "@nestjs/common";
import { CommandBus, ICommand, IEvent, ofType, Saga } from "@nestjs/cqrs";
import { SendMessageEvent } from "@oursocial/domain";
import { map, Observable } from "rxjs";
import { CreaterMessageCommand } from "./commands";

@Injectable()
export class MessagesSaga {
  constructor(private commandBus: CommandBus) { }
  @Saga()
  newMessage = (event$: Observable<IEvent>): Observable<ICommand> => event$.pipe(
    ofType(SendMessageEvent),
    map(({ content, senderId, roomId, timestamp }) =>
      new CreaterMessageCommand({ content, createdAt: timestamp, roomId, senderId }))
  );
}
