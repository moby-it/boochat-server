import { Injectable } from "@nestjs/common";
import { CommandBus, ICommand, IEvent, ofType, Saga } from "@nestjs/cqrs";
import { Message, SendMessageEvent } from "@oursocial/domain";
import { catchError, EMPTY, map, Observable, switchMap } from "rxjs";
import { CreateMessageCommand, CreateMessageCommandResult, EmitMessageCommand } from "./commands";

@Injectable()
export class MessagesSaga {
  constructor(private commandBus: CommandBus) { }
  @Saga()
  newMessage = (event$: Observable<IEvent>): Observable<ICommand> => event$.pipe(
    ofType(SendMessageEvent),
    switchMap(async ({ content, senderId, roomId, timestamp }) =>
      await this.commandBus.execute(new CreateMessageCommand({ content, createdAt: timestamp, roomId, senderId })) as CreateMessageCommandResult),
    map(result => {
      if (result.succeded) {
        const message = result.props as Message;
        return new EmitMessageCommand(message);
      }
      throw result.error;
    }),
    catchError(error => {
      console.error(error);
      return EMPTY;
    })
  );
}
