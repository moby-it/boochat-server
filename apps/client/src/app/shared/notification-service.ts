import { isMessage, RoomItem, User } from '@boochat/domain';
import { DOCUMENT_TITLE } from './variable';
let notificationCount = 0;
let notificationInterval: NodeJS.Timer | null = null;
let currentUser: User | null = null;
let allUsers: User[] = [];
const EVERY_SECOND = 1000;
interface NotificationServiceConfig {
  currentUser: User;
  allUsers: User[];
}

function initialize(config: NotificationServiceConfig) {
  currentUser = config.currentUser;
  allUsers = config.allUsers;
}
const createNotificationDocumentTitle = () => `(${notificationCount}) ${DOCUMENT_TITLE}`;
const notify = (item: RoomItem) => {
  if (!currentUser) throw new Error('cannot notify when current user in null');
  if (!isMessage(item) || (isMessage(item) && item.sender.id !== currentUser.id)) {
    if (!document.hasFocus()) {
      notificationCount++;
      const notificationCountTitle = createNotificationDocumentTitle();
      let notificationMessage = item.content;
      if (isMessage(item)) {
        const sender = allUsers.find((user) => user.id === item.sender.id);
        if (!sender) throw new Error('Notify: sender not found');
        notificationMessage = `${sender.name} sent a message.`;
      }
      notificationInterval = setInterval(() => {
        if (document.title === notificationCountTitle || document.title === DOCUMENT_TITLE) {
          document.title = notificationMessage;
        } else {
          document.title = notificationCountTitle;
        }
      }, EVERY_SECOND);
    }
    playAudio();
  }
};
const clearNotifications = () => {
  notificationCount = 0;
  if (notificationInterval) clearInterval(notificationInterval);
  document.title = DOCUMENT_TITLE;
};
function playAudio() {
  const audio = new Audio('../../assets/notification.mp3');
  audio.play().catch(() => {
    console.log('failed to play');
  });
}
const NotificationService = {
  initialize,
  notify,
  clearNotifications
};
export default NotificationService;
