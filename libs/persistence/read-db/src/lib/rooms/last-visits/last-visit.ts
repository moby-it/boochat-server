import { GoogleId } from '@boochat/domain';

export interface LastVisit {
  userId: GoogleId;
  timestamp: Date;
}
