import { UserId } from '@boochat/domain';

export interface LastVisit {
  userId: UserId;
  timestamp: Date;
}
