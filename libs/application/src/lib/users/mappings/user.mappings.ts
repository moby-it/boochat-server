import { User } from '@boochat/domain';
import { UserDocument } from '@boochat/persistence/shared-db';

export function fromDocumentToEntity(user: UserDocument): User {
  return User.create(user, user.id);
}
export function fromDocumentsToEntities(users: UserDocument[]): User[] {
  return users.map((user) => {
    return fromDocumentToEntity(user);
  });
}
