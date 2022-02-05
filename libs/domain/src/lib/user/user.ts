import { Entity } from "../common";

export class User extends Entity {

  constructor(public readonly email: string, id = 0) {
    super(id);
  }

}
