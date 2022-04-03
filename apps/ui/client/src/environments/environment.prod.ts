import { environment as environmentBase } from './environment.base';
export const environment = {
  ...environmentBase,
  remotes: {
    chat: 'https://boochatstorage.blob.core.windows.net/chat/remoteEntry.js',
    meetups: 'https://boochatstorage.blob.core.windows.net/meetups/remoteEntry.js'
  }
};
