import { User } from '@boochat/domain';

export interface AuthResponse {
  user: User;
  token: string;
}
