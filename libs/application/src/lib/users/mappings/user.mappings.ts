import { User } from '@boochat/domain';
import { UserDocument } from '@boochat/persistence/read-db';

export function fromDocumentToEntity(user: UserDocument): User {
  return User.create(
    {
      name: user.name,
      imageUrl: user.imageUrl
    },
    user._id
  );
}
export function fromDocumentsToEntities(users: UserDocument[]): User[] {
  return users.map((user) => {
    return fromDocumentToEntity(user);
  });
}
