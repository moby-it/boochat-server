import { RoomId } from "@oursocial/domain";
import { MessageDto } from "../messages";

export interface RoomDto {
  id?: RoomId;
  name: string;
  userIds: string[];
}
