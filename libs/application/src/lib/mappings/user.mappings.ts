import { Mapper, User } from "@pokedexe/domain";
import { ActiveUser } from "../user";

export class UserMapper implements Mapper<User, ActiveUser> {
  public map(a: User, socketId: string): ActiveUser {
    return {
      id: a.id,
      email: a.email,
      socketId
    };
  }

  public reverseMap(a: ActiveUser): User {
    return {
      id: a.id,
      email: a.email
    };
  }

}
